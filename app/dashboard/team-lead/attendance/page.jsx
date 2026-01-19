"use client";

import { useState } from "react";
import { Clock, Users, CheckCircle, AlertCircle } from "lucide-react";
import { getEmployeesByManager, getTeamAttendance } from "@/data/mockData";
import StatusBadge from "@/components/StatusBadge";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";

const TeamAttendancePage = () => {
  const [view, setView] = useState("daily");
  const teamAttendance = getTeamAttendance("2");
  const teamMembers = getEmployeesByManager("2");

  const todayAttendance = teamAttendance.filter((a) => a.date === "2026-01-17");

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
          <span className="text-sm font-medium text-black">
            {row.employeeName}
          </span>
        </div>
      ),
    },
    {
      header: "Date", accessor: (row) => (
        <span className="text-sm font-medium text-black">{row.date}</span>
    ) },
    { header: "Punch In", accessor: (row) => row.punchIn || "-" },
    { header: "Punch Out", accessor: (row) => row.punchOut || "-" },
    { header: "Work Hours", accessor: (row) => `${row.workHours}h` },
    {
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const presentCount = todayAttendance.filter(
    (a) => a.status === "present"
  ).length;
  const lateCount = todayAttendance.filter((a) => a.status === "late").length;

  return (
    <div>
      <PageHeader
        title="Team Attendance"
        description="Track your team's daily and monthly attendance"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Users className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {teamMembers.length}
              </p>
              <p className="text-sm text-black/80">Team Size</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{presentCount}</p>
              <p className="text-sm text-black/80">Present Today</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{lateCount}</p>
              <p className="text-sm text-black/80">Late Today</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {teamMembers.length - todayAttendance.length}
              </p>
              <p className="text-sm text-black/80">Absent Today</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-2 bg-gray-300 rounded-lg p-1 w-fit">
          <button
            onClick={() => setView("daily")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              view === "daily"
                ? "bg-black text-white shadow"
                : "text-gray-900 hover:text-gray-600"
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              view === "monthly"
                ? "bg-black text-white shadow"
                : "text-gray-900 hover:text-gray-600"
            }`}
          >
            Monthly View
          </button>
        </div>

        {view === "daily" && (
          <DataTable
            columns={columns}
            data={todayAttendance}
            emptyMessage="No attendance records for today"
          />
        )}

        {view === "monthly" && (
          <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
            <div className="p-6 border-b border-gray-300 shadow-sm">
              <h3 className="text-lg font-semibold text-black">
                Team Attendance - January 2025
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {teamMembers.map((member) => {
                  const memberAttendance = teamAttendance.filter(
                    (a) => a.employeeId === member.id
                  );
                  const presentDays = memberAttendance.filter(
                    (a) => a.status === "present" || a.status === "late"
                  ).length;
                  return (
                    <div key={member.id} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-700">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black">
                          {member.name}
                        </p>
                        <div className="w-full bg-slate-300 rounded-full h-2 mt-1">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(presentDays / 20) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {presentDays}/20 days
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamAttendancePage;
