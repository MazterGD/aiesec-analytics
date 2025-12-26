import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "../../lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Use environment variables for token and office (user cannot change these)
  const accessToken = process.env.EXPA_ACCESS_TOKEN;
  const officeId = process.env.EXPA_OFFICE_ID || "1552";

  const startDate = searchParams.get("start_date") || "2024-07-01";
  const endDate = searchParams.get("end_date") || "2025-06-30";
  const interval = searchParams.get("interval") || "month";

  if (!accessToken) {
    return NextResponse.json(
      {
        error:
          "Access token not configured. Please set EXPA_ACCESS_TOKEN in .env file.",
      },
      { status: 500 }
    );
  }

  const apiUrl = new URL(API_BASE_URL);
  apiUrl.searchParams.set("histogram[office_id]", officeId);
  apiUrl.searchParams.set("start_date", startDate);
  apiUrl.searchParams.set("end_date", endDate);
  apiUrl.searchParams.set("histogram[interval]", interval);
  apiUrl.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API Error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data", details: String(error) },
      { status: 500 }
    );
  }
}
