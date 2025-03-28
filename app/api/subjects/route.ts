import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT year, name FROM subjects"); // rows contains the result set

    // Ensure TypeScript understands that rows contain an array of { year: number, name: string }
    const subjects = rows as { year: number; name: string }[];

    const groupedSubjects = subjects.reduce((acc: Record<string, string[]>, subject) => {
      const { year, name } = subject;
      const yearString = year.toString();
      if (!acc[yearString]) acc[yearString] = [];
      acc[yearString].push(name);
      return acc;
    }, {});

    return NextResponse.json(groupedSubjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 });
  }
}
