import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (e) {
    console.log(e);
    //console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
