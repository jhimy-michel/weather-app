import axios from "axios";

export async function GET(searchParam:string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const city = searchParam;

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.log("Error fetching geocoded data");
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
