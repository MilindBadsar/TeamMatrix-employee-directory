import { useState } from "react";
import { Search, Filter } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchParams, setSearchParams] = useState({
    name: "",
    department: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-500 mb-1"
          >
            Search by Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={searchParams.name}
              onChange={handleChange}
              placeholder="Enter name to search"
              className="input input-bordered w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-500 mb-1"
          >
            Department
          </label>
          <select
            id="department"
            name="department"
            value={searchParams.department}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-500 mb-1"
          >
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={searchParams.position}
            onChange={handleChange}
            placeholder="Filter by position"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button type="submit" className="btn btn-primary flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
        </button>
      </div>
    </form>
  );
}
