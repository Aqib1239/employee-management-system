"use client";


import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { getTotalPayroll, mockEmployees, mockSalaryRecords } from "@/data/mockData";
import { DollarSign, Users, TrendingUp, Calculator } from "lucide-react";

const SalaryPage = () => {
  const currentMonthRecords = mockSalaryRecords.filter(
    (s) => s.month === "2025-01"
  );
  const totalSalary = getTotalPayroll();
  const avgSalary = totalSalary / currentMonthRecords.length;

  const columns = [
    {
      header: "Employee",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-blue-700">
              {row.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <span className="text-sm font-medium text-black/80">
            {row.employeeName}
          </span>
        </div>
      ),
    },
    {
      header: "Month", accessor: (row) => (
        <span className="text-sm font-medium text-black/80">
          {row.month}
        </span>
    ) },
    {
      header: "Basic Salary",
      accessor: (row) => (
        <span className="text-sm font-bold text-black/80">
          ${row.basicSalary.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Allowances",
      accessor: (row) => (
        <span className="text-sm text-green-600">
          +${row.allowances.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Deductions",
      accessor: (row) => (
        <span className="text-sm text-red-600">
          -${row.deductions.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Net Salary",
      accessor: (row) => (
        <span className="text-sm font-bold text-black/80">
          ${row.netSalary.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (row) => (
        <StatusBadge status={row.status === "paid" ? "approved" : "pending"} />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Salary"
        description="Monthly Salary overview and management"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <DollarSign className="h-10 w-10 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                ${totalSalary.toLocaleString()}
              </p>
              <p className="text-sm text-black/80">Total Salary</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Users className="h-10 w-10 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {currentMonthRecords.length}
              </p>
              <p className="text-sm text-black/80">Employees</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Calculator className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                ${Math.round(avgSalary).toLocaleString()}
              </p>
              <p className="text-sm text-black/80">Avg Salary</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <TrendingUp className="h-10 w-10 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">+3.2%</p>
              <p className="text-sm text-black/80">vs Last Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg lg:col-span-2">
          <div className="p-6 border-b border-gray-300 shadow-sm">
            <h3 className="text-black text-lg font-semibold">
              Salary Breakdown
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-200">
                <span className="text-black/80">Total Basic Salary</span>
                <span className="font-bold text-black/80">
                  $
                  {currentMonthRecords
                    .reduce((sum, s) => sum + s.basicSalary, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-200">
                <span className="text-black/80">Total Allowances</span>
                <span className="font-bold text-green-500">
                  +$
                  {currentMonthRecords
                    .reduce((sum, s) => sum + s.allowances, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-200">
                <span className="text-black/80">Total Deductions</span>
                <span className="font-bold text-red-500">
                  -$
                  {currentMonthRecords
                    .reduce((sum, s) => sum + s.deductions, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-200 border border-slate-300 shadow">
                <span className="font-semibold text-black">Net Salary</span>
                <span className="text-xl font-bold text-blue-600">
                  ${totalSalary.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-6 border-b border-gray-300 shadow-sm">
            <h3 className="text-black text-lg font-semibold">
              By Department
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {["Engineering", "Design", "HR", "Marketing", "Management"].map(
                (dept) => {
                  const deptEmployees = mockEmployees.filter(
                    (e) => e.department === dept
                  );
                  const deptTotal = deptEmployees.reduce(
                    (sum, e) => sum + e.salary / 12,
                    0
                  );
                  return (
                    <div
                      key={dept}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-black/80">
                        {dept}
                      </span>
                      <span className="text-sm font-semibold text-black">
                        ${Math.round(deptTotal).toLocaleString()}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={currentMonthRecords}
        emptyMessage="No Salary records"
      />
    </div>
  );
};

export default SalaryPage;
