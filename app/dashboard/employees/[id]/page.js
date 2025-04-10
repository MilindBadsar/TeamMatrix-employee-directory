"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import EmployeeCard from "@/components/employees/EmployeeCard";
import EmployeeForm from "@/components/employees/EmployeeForm";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function EmployeeDetailPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get("edit") === "true";

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/${params.id}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch employee details");
        }

        setEmployee(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [params.id]);

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/dashboard/employees" className="mr-4">
          <ArrowLeft className="mb-11 text-black" />
        </Link>
        <h1 className="text-3xl font-bold mb-12 text-black">
          {isEditing ? "Edit Employee" : "Employee Details"}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : employee ? (
        isEditing ? (
          <EmployeeForm employee={employee} />
        ) : (
          <EmployeeCard employee={employee} />
        )
      ) : (
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <p className="text-yellow-600">Employee not found.</p>
        </div>
      )}
    </div>
  );
}
