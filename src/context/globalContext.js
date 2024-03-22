"use client";
import { GET as getWeather } from "../app/api/weather/route";
import { GET as getAirPollution } from "../app/api/pollution/route";
import { GET as getFiveDaysForecast } from "../app/api/fivehourday/route";
import { GET as getUvIndex } from "../app/api/uv/route";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

const GlobalContext = React.createContext();
const GlobalContextUpdate = React.createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState();
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const [activeCityCoords, setActiveCityCoords] = useState([51.752021, -1.257726]);

  const fetchForecast = async () => {
    try {
      const response = await getWeather();
      setForecast(response);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAirQuality = async () => {
    try {
      const res = await getAirPollution();
      setAirQuality(res);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFiveDaysForecast = async () => {
    try {
      const res = await getFiveDaysForecast();
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

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDaysForecast();
    fetchUvData(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast, uvIndex }}>
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
