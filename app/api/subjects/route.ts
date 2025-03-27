import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Use the first element of the query result (rows)
    const [subjects]: any = await db.query("SELECT year, name FROM subjects");
    
    // Apply reduce directly to the rows array
    const groupedSubjects = subjects.reduce((acc: Record<number, string[]>, subject: { year: number; name: string }) => {
      const { year, name } = subject;
      const yearString: any = year.toString();
      if (!acc[yearString]) acc[yearString] = [];
      acc[yearString].push(name);
      return acc;
    }, {});

    return NextResponse.json(groupedSubjects);
  } catch (error: any) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 });
  }
}
