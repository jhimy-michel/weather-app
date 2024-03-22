import { NextRequest, NextResponse } from "next/server";

export async function GET(latParam: undefined, longParam: undefined) {
  try {
    const lat = latParam;
    const lon = longParam;

    // this is a free api to get the UV
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const uvData = await res.json();

    return uvData;
  } catch (error) {
    console.log("Error Getting Uv Data");
    console.log(error);

    return new Response("Error getting Uv Data", { status: 500 });
  }
}
