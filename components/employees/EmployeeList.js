import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye, AlertCircle } from "lucide-react";

export default function EmployeeList({ employees, onDelete, onRefresh }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setDeletingId(id);
      try {
        const response = await fetch(`/api/employees/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to delete employee");
        }

        onRefresh();
      } catch (error) {
        setError(error.message);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (employees.length === 0) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg text-center">
        <p className="text-yellow-600">
          No employees found. Add your first employee!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Joining Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.employeeId}</td>
                <td>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-gray-500">
                      {employee.email}
                    </div>
                  </div>
                </td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
                <td className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/dashboard/employees/${employee._id}`}
                      className="btn btn-sm btn-ghost btn-square"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/dashboard/employees/${employee._id}?edit=true`}
                      className="btn btn-sm btn-ghost btn-square"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      disabled={deletingId === employee._id}
                      className="btn btn-sm btn-ghost btn-square text-red-500"
                    >
                      {deletingId === employee._id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
