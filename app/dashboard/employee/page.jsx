"use client";

import { Clock, FileText, DollarSign, Calendar } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatsCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { getAttendanceByEmployee, getLeavesByEmployee, getSalaryByEmployee, mockHolidays } from "@/data/mockData";


const EmployeeDashboard = () => {
  // Using Mike Employee's ID (id: "3") as the logged in employee
  const myAttendance = getAttendanceByEmployee("3");
  const myLeaves = getLeavesByEmployee("3");
  const mySalary = getSalaryByEmployee("3");

  const todayAttendance = myAttendance.find((a) => a.date === "2025-01-17");
  const leaveBalance = { annual: 12, sick: 8, casual: 5 };
  const usedLeaves = { annual: 2, sick: 1, casual: 0 };
  const latestSalary = mySalary[0];

  const upcomingHolidays = mockHolidays
    .filter((h) => new Date(h.date) >= new Date("2025-01-17"))
    .slice(0, 3);

  return (
    <div>
      <PageHeader
        title="Employee Dashboard"
        description="Your personal workspace"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Today's Status"
          value={todayAttendance ? "Checked In" : "Not Checked In"}
          icon={Clock}
          description={
            todayAttendance
              ? `Punched in at ${todayAttendance.punchIn}`
              : "Punch in to start your day"
          }
        />
        <StatsCard
          title="Leave Balance"
          value={`${leaveBalance.annual - usedLeaves.annual} days`}
          icon={FileText}
          description="Annual leave remaining"
        />
        <StatsCard
          title="This Month Salary"
          value={
            latestSalary ? `$${latestSalary.netSalary.toLocaleString()}` : "-"
          }
          icon={DollarSign}
          description={latestSalary?.status === "paid" ? "Paid" : "Pending"}
        />
        <StatsCard
          title="Next Holiday"
          value={upcomingHolidays[0]?.name || "-"}
          icon={Calendar}
          description={upcomingHolidays[0]?.date || "-"}
        />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Overview */}
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-6 border-b border-gray-300 shadow">
            <div className="text-lg font-semibold text-black flex items-center gap-2">
              <Clock className="h-7 w-7 text-black" />
              Recent Attendance
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {myAttendance.slice(0, 5).map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-200"
                >
                  <div>
                    <p className="text-sm font-medium text-black">{record.date}</p>
                    <p className="text-sm text-black/80">
                      {record.punchIn || "-"} - {record.punchOut || "-"}
                    </p>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leave Balance */}
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-6 border-b border-gray-300">
            <div className="text-lg font-semibold text-black flex items-center gap-2">
              <FileText className="h-7 w-7 text-black" />
              Leave Balance
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-200">
                <div>
                  <p className="font-medium text-black">Annual Leave</p>
                  <p className="text-sm text-black/80">
                    {usedLeaves.annual} used of {leaveBalance.annual}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black">
                    {leaveBalance.annual - usedLeaves.annual}
                  </p>
                  <p className="text-xs text-black/80">remaining</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-200">
                <div>
                  <p className="font-medium text-black">Sick Leave</p>
                  <p className="text-sm text-black/80">
                    {usedLeaves.sick} used of {leaveBalance.sick}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black">
                    {leaveBalance.sick - usedLeaves.sick}
                  </p>
                  <p className="text-xs text-black/80">remaining</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-200">
                <div>
                  <p className="font-medium text-black">Casual Leave</p>
                  <p className="text-sm text-black/80">
                    {usedLeaves.casual} used of {leaveBalance.casual}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black">
                    {leaveBalance.casual - usedLeaves.casual}
                  </p>
                  <p className="text-xs text-black/80">remaining</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Holidays */}
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-6 border-b border-gray-300 shadow">
            <div className="text-lg font-semibold text-black flex items-center gap-2">
              <Calendar className="h-7 w-7 text-black" />
              Upcoming Holidays
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {upcomingHolidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-200"
                >
                  <div>
                    <p className="text-sm font-medium text-black">
                      {holiday.name}
                    </p>
                    <p className="text-xs text-black/80">
                      {holiday.date}
                    </p>
                  </div>
                  <StatusBadge status={holiday.type} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Salary Summary */}
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-6 border-b border-gray-300 shadow">
            <div className="text-lg font-semibold text-black flex items-center gap-2">
              <DollarSign className="h-7 w-7 text-black" />
              Salary Summary
            </div>
          </div>
          <div className="p-6">
            {latestSalary && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-200">
                  <span className="text-black/80">Basic Salary</span>
                  <span className="font-semibold text-blue-500">
                    ${latestSalary.basicSalary.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-200">
                  <span className="text-black/80">Allowances</span>
                  <span className="font-semibold text-green-500">
                    +${latestSalary.allowances.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-200">
                  <span className="text-muted-foreground">Deductions</span>
                  <span className="font-semibold text-red-600">
                    -${latestSalary.deductions.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-100 border border-blue-200 shadow">
                  <span className="font-medium text-black">
                    Net Salary
                  </span>
                  <span className="text-xl font-bold text-black">
                    ${latestSalary.netSalary.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
