import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(lat: any, lon: any) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);
    // console.log(res.data)
    return res.data;
  } catch (e) {
    console.log(e);
    //console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
