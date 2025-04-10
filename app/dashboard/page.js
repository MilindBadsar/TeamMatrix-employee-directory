import Link from "next/link";
import { Users, UserPlus, Database, Download } from "lucide-react";
import dbConnect from "@/lib/db/connect";
import Employee from "@/lib/db/models/Employee";

async function getDashboardData() {
  await dbConnect();

  const totalEmployees = await Employee.countDocuments();

  const departmentCounts = await Employee.aggregate([
    { $group: { _id: "$department", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const recentEmployees = await Employee.find()
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    totalEmployees,
    departmentCounts,
    recentEmployees,
  };
}

export default async function DashboardPage() {
  const { totalEmployees, departmentCounts, recentEmployees } =
    await getDashboardData();

  const cards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "bg-blue-500",
      href: "/dashboard/employees",
    },
    {
      title: "Add Employee",
      value: "New",
      icon: UserPlus,
      color: "bg-green-500",
      href: "/dashboard/employees/add",
    },
    {
      title: "Export Data",
      value: "CSV/JSON",
      icon: Download,
      color: "bg-purple-500",
      href: "/api/employees/export?format=csv",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-12 text-black">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`${card.color} p-3 rounded-full mr-4`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-700">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Department Distribution
          </h2>
          {departmentCounts.length === 0 ? (
            <p className="text-gray-500">No departments data available yet.</p>
          ) : (
            <div className="space-y-4">
              {departmentCounts.map((dept) => (
                <div key={dept._id} className="flex items-center">
                  <span className="w-1/3 text-gray-600">{dept._id}</span>
                  <div className="w-2/3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{
                          width: `${(dept.count / totalEmployees) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-gray-600">
                      <span>{dept.count} employees</span>
                      <span>
                        {Math.round((dept.count / totalEmployees) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Recent Employees
          </h2>
          {recentEmployees.length === 0 ? (
            <p className="text-gray-500">No employees added yet.</p>
          ) : (
            <div className="space-y-3">
              {recentEmployees.map((employee) => (
                <Link
                  key={employee._id}
                  href={`/dashboard/employees/${employee._id}`}
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                >
                  <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                    <span className="font-medium text-primary">
                      {employee.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">{employee.name}</p>
                    <p className="text-sm text-gray-500">
                      {employee.position}, {employee.department}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
