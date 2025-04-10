import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Employee from "@/lib/db/models/Employee";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
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

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "json";

    await dbConnect();
    const employees = await Employee.find({}).sort({ createdAt: -1 });

    if (format === "csv") {
      // Generate CSV
      const header =
        "ID,Name,Email,Phone Number,Department,Position,Joining Date\n";
      const csvRows = employees.map((emp) => {
        return `${emp.employeeId},${emp.name},${emp.email},${emp.phoneNumber},${
          emp.department
        },${emp.position},${
          new Date(emp.joiningDate).toISOString().split("T")[0]
        }`;
      });
      const csvContent = header + csvRows.join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=employees.csv",
        },
      });
    }

    // Default to JSON
    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
