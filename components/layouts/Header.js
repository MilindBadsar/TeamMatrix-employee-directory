import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Employee Directory</span>
        </Link>
        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
