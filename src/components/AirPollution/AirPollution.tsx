"use client";

import { useGlobalContext } from "@/context/globalContext";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { thermo } from "@/utils/icons";
import { airQualityIndexText } from "@/utils/misc";
import { Progress } from "../ui/progress";

const AirPollution = () => {
  const { airQuality } = useGlobalContext();
  console.log(airQuality);

  if (!airQuality || !airQuality.list || !airQuality.list[0] || !airQuality.list[0].main) {
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-2" />;
  }
  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQualityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
    dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2 font-medium"> {thermo} Air pollution</h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p className="text-sm">Air quality is {filteredIndex?.description}. </p>
    </div>
  );
};

export default AirPollution;
