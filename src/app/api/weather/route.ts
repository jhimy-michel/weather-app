import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = "c08f133c70bedbb6e4754ca9355dd956";
    const lat = 40.4165;
    const lon = -3.7026;
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
