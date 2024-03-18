"use client";
import { GET as getWeather } from "../app/api/weather/route";
import { GET as getAirPollution } from "../app/api/pollution/route";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

const GlobalContext = React.createContext();
const GlobalContextUpdate = React.createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState();
  const [airQuality, setAirQuality] = useState({});

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

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
  }, []);
  return (
    <GlobalContext.Provider value={{ forecast, airQuality }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
