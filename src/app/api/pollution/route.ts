import axios from "axios";

export async function GET(req: Request) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const lat = 40.4165;
    const lon = -3.7026;
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    console.log(e);
    //console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
