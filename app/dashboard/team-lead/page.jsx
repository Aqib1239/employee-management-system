"use client";

import { Users, Clock, FileText, CheckCircle } from "lucide-react";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { getEmployeesByManager, getTeamAttendance, getTeamLeaveRequests } from "@/data/mockData";

const TeamLeadDashboard = () => {
  // Using Sarah Lead's ID (id: "2") as the logged in team lead
  const teamMembers = getEmployeesByManager("2");
  const teamLeaves = getTeamLeaveRequests("2");
  const teamAttendance = getTeamAttendance("2");

  const pendingLeaves = teamLeaves.filter((l) => l.status === "pending");
  const todayAttendance = teamAttendance.filter((a) => a.date === "2025-01-17");
  const presentToday = todayAttendance.filter(
    (a) => a.status === "present" || a.status === "late"
  ).length;

  const memberColumns = [
    {
      header: "Member",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-blue-700">
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-black">{row.name}</p>
            <p className="text-xs text-black/80">{row.position}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Email", accessor: (row) => (
        <span className="text-sm font-medium text-black">{row.email}</span>
    ) },
    {
      header: "Status",
      accessor: (row) => (
        <StatusBadge status={row.status === "active" ? "present" : "absent"} />
      ),
    },
  ];

  const leaveColumns = [
    { header: "Employee", accessor: "employeeName" },
    { header: "Type", accessor: "type", className: "capitalize" },
    {
      header: "Duration",
      accessor: (row) => `${row.startDate} - ${row.endDate}`,
    },
    {
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Team Lead Dashboard"
        description="Overview of your team"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Team Members"
          value={teamMembers.length}
          icon={Users}
          description="In your team"
        />
        <StatCard
          title="Present Today"
          value={`${presentToday}/${teamMembers.length}`}
          icon={CheckCircle}
          description="Attendance today"
        />
        <StatCard
          title="Pending Leaves"
          value={pendingLeaves.length}
          icon={FileText}
          description="Awaiting approval"
        />
        <StatCard
          title="Avg. Work Hours"
          value="8.5h"
          icon={Clock}
          description="This week"
        />
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-gray-300 shadow-md rounded-lg">
          <div className="p-6 border-b border-gray-300 shadow-sm">
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
              <Users className="h-7 w-7 text-black" />
              Team Members
            </h3>
          </div>
          <div className="p-0">
            <DataTable
              columns={memberColumns}
              data={teamMembers}
              emptyMessage="No team members"
            />
          </div>
        </div>

        <div className="border border-gray-300 shadow-md rounded-lg">
          <div className="p-6 border-b border-gray-300 shadow-sm">
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
              <FileText className="h-5 w-5 text-black" />
              Pending Leave Requests
            </h3>
          </div>
          <div className="p-0">
            <DataTable
              columns={leaveColumns}
              data={pendingLeaves}
              emptyMessage="No pending requests"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeadDashboard;
