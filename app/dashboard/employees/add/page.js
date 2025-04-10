"use client";

import { UserPlus } from "lucide-react";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default function AddEmployeePage() {
  return (
    <div>
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold mb-12 text-black">
          Add New Employee
        </h1>
      </div>

      <EmployeeForm />
    </div>
  );
}
