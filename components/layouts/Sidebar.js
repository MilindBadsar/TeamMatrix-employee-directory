"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, UserPlus, Search, Download, Home } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/employees", icon: Users, label: "All Employees" },
    { href: "/dashboard/employees/add", icon: UserPlus, label: "Add Employee" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white shadow md:min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                    isActive
                      ? "bg-primary text-white hover:bg-primary-focus"
                      : ""
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/api/employees/export?format=csv"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100"
              target="_blank"
            >
              <Download className="h-5 w-5" />
              <span>Export CSV</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
