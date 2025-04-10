import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Employee from "@/lib/db/models/Employee";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const department = searchParams.get("department");
    const position = searchParams.get("position");

    await dbConnect();

    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (department) query.department = department;
    if (position) query.position = position;

    const employees = await Employee.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
      return (
        redirectToSignIn(),
        NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 401 }
        )
      );
    }

    await dbConnect();
    const body = await request.json();

    const employee = await Employee.create(body);
    return NextResponse.json(
      { success: true, data: employee },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
