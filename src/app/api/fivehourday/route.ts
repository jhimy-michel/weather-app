import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const dailyRes = await fetch(dailyUrl, {
      next: { revalidate: 3600 },
    });

    const dailyData = await dailyRes.json();

    return NextResponse.json(dailyData);
  } catch (e) {
    console.log(e);
    //console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
