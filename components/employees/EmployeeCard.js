import Link from "next/link";
import { Mail, Phone, Briefcase, Calendar, Pencil } from "lucide-react";

export default function EmployeeCard({ employee }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-black">{employee.name}</h2>
            <p className="text-gray-500">{employee.position}</p>
          </div>
          <Link
            href={`/dashboard/employees/${employee._id}?edit=true`}
            className="btn btn-sm"
          >
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Link>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded mr-3">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium text-black">{employee.department}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded mr-3">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-black">{employee.email}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded mr-3">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-black">{employee.phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded mr-3">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Joining Date</p>
              <p className="font-medium text-black">
                {new Date(employee.joiningDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center">
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
              ID: {employee.employeeId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
