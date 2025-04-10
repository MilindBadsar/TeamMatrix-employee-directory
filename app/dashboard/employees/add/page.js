"use client";

import { UserPlus } from "lucide-react";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default function AddEmployeePage() {
  return (
    <div>
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold mb-6 text-black">Add New Employee</h1>
        <hr className="border-t border-gray-300 w-full mb-4" />
      </div>

      <EmployeeForm />
    </div>
  );
}
