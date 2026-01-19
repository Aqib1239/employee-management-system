"use client";

import { useState } from "react";

import { DollarSign, Download, Building, Calendar, User } from "lucide-react";
import { getSalaryByEmployee } from "@/data/mockData";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

const SalaryPage = () => {
  const mySalary = getSalaryByEmployee("3");
  const [selectedMonth, setSelectedMonth] = useState(
    mySalary[0]?.month || "2025-01"
  );

  const currentSalary =
    mySalary.find((s) => s.month === selectedMonth) || mySalary[0];

  return (
    <div>
      <PageHeader
        title="Salary / Payslip"
        description="View your salary breakdown"
      >
        <div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full max-w-[180px] border border-gray-300 shadow rounded-lg px-3 py-2 text-black/80"
          >
            {mySalary.map((s) => (
              <option key={s.month} value={s.month} className="text-xs">
                {new Date(s.month + "-01").toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Salary Card */}
        <div className="border border-gray-300 shadow-md rounded-lg lg:col-span-2">
          <div className="p-6 border-b border-gray-300 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-black">Salary</div>
                <p className="text-sm text-black/80 mt-1">
                  {new Date(selectedMonth + "-01").toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <StatusBadge
                status={
                  currentSalary?.status === "paid" ? "approved" : "pending"
                }
              />
            </div>
          </div>
          <div className="p-6 pt-6">
            {/* Employee Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-slate-200">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-black" />
                <div>
                  <p className="text-xs text-black/80">Employee Name</p>
                  <p className="font-medium text-black">Mike Employee</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-black" />
                <div>
                  <p className="text-xs text-black/80">Department</p>
                  <p className="font-medium text-black">Engineering</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-black" />
                <div>
                  <p className="text-xs text-black/80">Pay Period</p>
                  <p className="font-medium text-black">{selectedMonth}</p>
                </div>
              </div>
            </div>

            {currentSalary && (
              <div className="space-y-4">
                {/* Earnings */}
                <div>
                  <h3 className="font-semibold text-black mb-3">Earnings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 rounded-lg bg-slate-200">
                      <span className="text-black/80">Basic Salary</span>
                      <span className="font-medium text-black">
                        ${currentSalary.basicSalary.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-slate-200">
                      <span className="text-black/80">Housing Allowance</span>
                      <span className="font-medium text-black">
                        $
                        {Math.round(
                          currentSalary.allowances * 0.6
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-slate-200">
                      <span className="text-black/80">Transport Allowance</span>
                      <span className="font-medium text-black">
                        $
                        {Math.round(
                          currentSalary.allowances * 0.4
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-green-100 border border-green-300">
                      <span className="font-medium text-green-700">
                        Total Earnings
                      </span>
                      <span className="font-bold text-green-700">
                        $
                        {(
                          currentSalary.basicSalary + currentSalary.allowances
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-300" />

                {/* Deductions */}
                <div>
                  <h3 className="font-semibold text-black mb-3">Deductions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 rounded-lg bg-slate-200">
                      <span className="text-black/80">Tax</span>
                      <span className="font-medium text-black">
                        $
                        {Math.round(
                          currentSalary.deductions * 0.7
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-slate-200">
                      <span className="text-black/80">Insurance</span>
                      <span className="font-medium text-black">
                        $
                        {Math.round(
                          currentSalary.deductions * 0.2
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-slate-200">
                      <span className="text-black/80">
                        Attendance Deduction
                      </span>
                      <span className="font-medium text-black">
                        $
                        {Math.round(
                          currentSalary.deductions * 0.1
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-red-100 border border-red-300">
                      <span className="font-medium text-red-700">
                        Total Deductions
                      </span>
                      <span className="font-bold text-red-600">
                        -${currentSalary.deductions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-300" />

                {/* Net Pay */}
                <div className="p-6 rounded-lg bg-blue-100 border border-blue-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-8 w-8 text-blue-700" />
                      <div>
                        <p className="text-sm text-blue-600">Net Salary</p>
                        <p className="text-3xl font-bold text-blue-700">
                          ${currentSalary.netSalary.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-blue-500 text-blue-700 rounded-md hover:bg-blue-600 hover:text-white bg-white transition-colors duration-300 flex items-center cursor-pointer">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Card */}
        <div className="space-y-6">
          <div className="border border-gray-300 shadow-md rounded-lg">
            <div className="p-6 border-b border-gray-300 shadow">
              <div className="text-lg font-semibold text-black">
                Salary History
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {mySalary.map((salary) => (
                  <div
                    key={salary.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      salary.month === selectedMonth
                        ? "bg-blue-100 border border-blue-300 shadow"
                        : "bg-slate-200 hover:bg-slate-300"
                    }`}
                    onClick={() => setSelectedMonth(salary.month)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedMonth(salary.month)
                    }
                    tabIndex={0}
                    role="button"
                  >
                    <div>
                      <p className="font-medium text-black">
                        {new Date(salary.month + "-01").toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-sm text-black/80">
                        ${salary.netSalary.toLocaleString()}
                      </p>
                    </div>
                    <StatusBadge
                      status={salary.status === "paid" ? "approved" : "pending"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-gray-300 shadow-md rounded-lg">
            <div className="p-6 border-b border-gray-300 shadow">
              <div className="text-lg font-semibold text-black">
                Annual Summary
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-black/80">Total Earned</span>
                  <span className="font-medium text-black">
                    $
                    {mySalary
                      .reduce((sum, s) => sum + s.netSalary, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/80">Avg Monthly</span>
                  <span className="font-medium text-black">
                    $
                    {Math.round(
                      mySalary.reduce((sum, s) => sum + s.netSalary, 0) /
                        mySalary.length
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 flex justify-between bg-red-100 border border-red-300 rounded-lg shadow">
                  <span className="text-black/80">Total Deductions</span>
                  <span className="font-medium text-red-600">
                    $
                    {mySalary
                      .reduce((sum, s) => sum + s.deductions, 0)
                      .toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
