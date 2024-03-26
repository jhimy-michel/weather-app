import axios from "axios";

export async function GET(req: Request) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const lat = 40.7128;
    const lon = -74.006;

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const dailyRes = await fetch(dailyUrl, {
      next: { revalidate: 3600 },
    });

    const dailyData = await dailyRes.json();
    
    return dailyData;
  } catch (e) {
    console.log(e);
    //console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
