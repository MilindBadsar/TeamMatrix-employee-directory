"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/employees/SearchBar";
import EmployeeList from "@/components/employees/EmployeeList";
import { AlertCircle } from "lucide-react";

export default function EmployeesPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      // Build query string from params
      const queryString = Object.keys(params)
        .filter((key) => params[key])
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&");

      const url = `/api/employees${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch employees");
      }

      setEmployees(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (searchParams) => {
    fetchEmployees(searchParams);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-12 text-black">
        Employee Directory
      </h1>

      <SearchBar onSearch={handleSearch} />

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
      ) : (
        <EmployeeList
          employees={employees}
          onRefresh={() => fetchEmployees()}
        />
      )}
    </div>
  );
}
