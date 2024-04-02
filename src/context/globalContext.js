"use client";
import { GET as getWeather } from "../app/api/weather/route";
import { GET as getAirPollution } from "../app/api/pollution/route";
import { GET as getFiveDaysForecast } from "../app/api/fivehourday/route";
import { GET as getUvIndex } from "../app/api/uv/route";
import { GET as getGeocoded } from "../app/api/geocoded/route";
import React, { useEffect, useState, useContext } from "react";
import defaultStates from "@/utils/defaultStates";

import { debounce } from "lodash";

const GlobalContext = React.createContext();
const GlobalContextUpdate = React.createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState();
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const [activeCityCoords, setActiveCityCoords] = useState([47.3769, 8.5417]);
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await getWeather(lat, lon);
      setForecast(response);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await getAirPollution(lat, lon);
      setAirQuality(res);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFiveDaysForecast = async (lat, lon) => {
    try {
      const res = await getFiveDaysForecast(lat, lon);
      setFiveDayForecast(res);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUvData = async (lat, lon) => {
    try {
      const res = await getUvIndex(lat, lon);
      setUvIndex(res);
    } catch (e) {
      console.log(e);
    }
  };

  // handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  // geocoded list
  const fetchGeoCodedList = async (search) => {
    // console.log(search);
    try {
      const res = await getGeocoded(search);

      // console.log(res);
      setGeoCodedList(res);
    } catch (error) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 1000);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDaysForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvData(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
