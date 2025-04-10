"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { SignedIn, SignOutButton, useClerk, UserButton } from "@clerk/nextjs";
import { Users, UserPlus, Search, Download, Home } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { openUserProfile } = useClerk();

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/employees", icon: Users, label: "All Employees" },
    { href: "/dashboard/employees/add", icon: UserPlus, label: "Add Employee" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white shadow md:min-h-screen">
      <nav className="p-4 h-full flex flex-col">
        <ul className="space-y-4 flex-1 flex flex-col mb-2 p-2">
          {" "}
          <div className="flex items-center justify-center p-4 mb-4">
            <Image
              src="/images/TeamMatrix-logo-horiz.PNG"
              alt="TeamMatrix Logo"
              width={150}
              height={40}
              priority
            />
          </div>
          <div className="flex-1 space-y-3">
            {" "}
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded hover:bg-gray-200 text-lg ${
                      isActive
                        ? "bg-primary text-white hover:bg-primary-focus hover:text-gray-800"
                        : "text-gray-900"
                    }`}
                  >
                    <item.icon className="h-6 w-6" /> <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/api/employees/export?format=csv"
                className="flex items-center space-x-3 p-3 rounded hover:bg-gray-200 text-gray-900 text-lg"
                target="_blank"
              >
                <Download className="h-6 w-6" /> <span>Export CSV</span>
              </Link>
            </li>
          </div>
          <div className="mt-auto space-y-3">
            {" "}
            <li>
              <div className="flex items-center space-x-3 p-3 rounded hover:bg-gray-200 text-gray-900 text-lg">
                <span>Theme</span>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </li>
            <li>
              <SignedIn>
                <div
                  onClick={() => openUserProfile()}
                  className="flex items-center space-x-3 p-3 rounded border hover:bg-gray-200 text-gray-900 text-lg cursor-pointer"
                >
                  <UserButton userProfileMode="navigation" />
                  <span>Account</span>
                </div>
              </SignedIn>
            </li>
            <li>
              <SignedIn>
                <SignOutButton className="flex items-center space-x-3 p-3 rounded hover:bg-red-500 text-gray-900 bg-red-400 w-full text-lg">
                  <span>Logout</span>
                </SignOutButton>
              </SignedIn>
            </li>
          </div>
        </ul>
      </nav>
    </aside>
  );
}
