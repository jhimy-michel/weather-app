"use client";
import { useGlobalContext } from "@/context/globalContext";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/utils/icons";
import { kelvinToCelsius } from "@/utils/misc";
import React, { useState } from "react";

const Temperature = () => {
  // @ts-ignore
  const { forecast } = useGlobalContext();
  console.log(forecast);

  if (!forecast) return <div>Loading...</div>;

  const { main, weather } = forecast;
  const temp = kelvinToCelsius(main.temp);
  const tempMax = kelvinToCelsius(main.temp_min);
  const tempMin = kelvinToCelsius(main.temp_max);

  // state
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [localTime, setLocalTime] = useState<string>("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div className="pt-6 pb-5 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
    </div>
  );
};

export default Temperature;
