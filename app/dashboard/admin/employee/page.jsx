"use client";

import { Suspense, useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { mockEmployees } from "@/data/mockData";
import { Search, Plus, Mail, Building, Calendar } from "lucide-react";

const EmployeesContent = () => {
  const [search, setSearch] = useState("");

  const filteredEmployees = mockEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Employee",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-700">
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="font-medium text-black/90">{row.name}</p>
            <p className="text-sm text-black/60">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Position",
      accessor: (row) => (
        <div>
          <p className="font-medium text-black/90">{row.position}</p>
          <p className="text-sm text-black/60 capitalize">
            {row.role.replace("-", " ")}
          </p>
        </div>
      ),
    },
    {
      header: "Department",
      accessor: "department",
    },
    {
      header: "Status",
      accessor: (row) => (
        <StatusBadge status={row.status === "active" ? "present" : "absent"} />
      ),
    },
    {
      header: "Join Date",
      accessor: "joinDate",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Employees"
        description="Manage all employees in your organization"
      >
        <button className="border border-gray-300 shadow-md text-black/90 hover:bg-gray-900 hover:text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </button>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Mail className="h-10 w-10 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {mockEmployees.length}
              </p>
              <p className="text-sm text-black/80">Total Employees</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Building className="h-10 w-10 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {mockEmployees.filter((e) => e.status === "active").length}
              </p>
              <p className="text-sm text-black/80">Active</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Calendar className="h-10 w-10 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">5</p>
              <p className="text-sm text-black/80">Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
          <input
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 border border-gray-300 shadow-sm rounded-lg w-full px-3 py-2 text-sm text-black/90 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredEmployees}
        emptyMessage="No employees found"
      />
    </div>
  );
};

const EmployeesPage = () => {
  return (
    <Suspense fallback={null}>
      <EmployeesContent />
    </Suspense>
  );
};

export default EmployeesPage;
