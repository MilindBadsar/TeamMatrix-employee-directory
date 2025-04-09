"use client";

import { UserPlus } from "lucide-react";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default function AddEmployeePage() {
  return (
    <div>
      <div className="flex items-center mb-6">
        <UserPlus className="h-6 w-6 mr-2" />
        <h1 className="text-2xl font-bold">Add New Employee</h1>
      </div>

      <EmployeeForm />
    </div>
  );
}
