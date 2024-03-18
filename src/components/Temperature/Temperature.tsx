"use client";
import { useGlobalContext } from "@/context/globalContext";
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from "@/utils/icons";
import { kelvinToCelsius } from "@/utils/misc";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Temperature = () => {
  const { forecast } = useGlobalContext();

  if (!forecast) return <div>Loading...</div>;

  const { main, weather, timezone, name } = forecast;
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

  // live time update

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // update time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);

      // set custom format
      const formatedTime = localMoment.format("HH:mm:ss");

      // day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);
  }, []);

  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp} °</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {tempMin} °</span>
          <span>High: {tempMax} °</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;
