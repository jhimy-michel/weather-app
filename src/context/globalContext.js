"use client";
import { GET } from "@/api/weather/route";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

const GlobalContext = React.createContext();
const GlobalContextUpdate = React.createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState();
  // console.log(forecast)

  const fetchForecast = async () => {
    try {
      const response = await GET();
      console.log(response);
      setForecast(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);
  return (
    <GlobalContext.Provider value={{ forecast }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
