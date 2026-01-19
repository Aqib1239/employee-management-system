"use client";

import { Users, Clock, FileText, DollarSign, TrendingUp } from "lucide-react";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import StatsCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import {
  mockEmployees,
  mockLeaveRequests,
  getAttendanceStats,
  getTotalPayroll,
  getPendingLeaveRequests,
} from "@/data/mockData";

const AdminDashboard = () => {
  const pendingLeaves = getPendingLeaveRequests();
  const attendanceRate = getAttendanceStats();
  const totalPayroll = getTotalPayroll();
  const activeEmployees = mockEmployees.filter(
    (e) => e.status === "active"
  ).length;

  const leaveColumns = [
    { header: "Employee", accessor: "employeeName" },
    { header: "Type", accessor: "type", className: "capitalize" },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    {
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Overview of your organization"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Employees"
          value={activeEmployees}
          icon={Users}
          description={`${mockEmployees.length - activeEmployees} inactive`}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          icon={Clock}
          description="This month"
          trend={{ value: 2.5, isPositive: true }}
        />
        <StatsCard
          title="Pending Leaves"
          value={pendingLeaves.length}
          icon={FileText}
          description="Awaiting approval"
        />
        <StatsCard
          title="Monthly Payroll"
          value={`$${totalPayroll.toLocaleString()}`}
          icon={DollarSign}
          description="January 2025"
          trend={{ value: 3.2, isPositive: false }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-gray-300 shadow-md rounded-xl">
          <div className="p-6 border-b border-gray-300 shadow-md">
            <h3 className="text-lg font-semibold text-black/80 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Leave Requests
            </h3>
          </div>
          <div className="p-0">
            <DataTable
              columns={leaveColumns}
              data={mockLeaveRequests.slice(0, 5)}
              emptyMessage="No leave requests"
            />
          </div>
        </div>

        <div className="border border-gray-300 shadow-md rounded-lg">
          <div className="p-6 border-b border-gray-300 shadow-md">
            <h3 className="text-lg font-semibold text-black/80 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Stats
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-200">
                <span className="text-sm text-black/80">Departments</span>
                <span className="font-semibold text-black/80">5</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-200">
                <span className="text-sm">Team Leads</span>
                <span className="font-semibold">
                  {mockEmployees.filter((e) => e.role === "team-lead").length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-200">
                <span className="text-sm">Avg. Work Hours</span>
                <span className="font-semibold">8.2h</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-200">
                <span className="text-sm">Leaves This Month</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;