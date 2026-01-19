"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { mockAttendance, mockEmployees } from "@/data/mockData";
import { Clock, Users, AlertCircle, CheckCircle } from "lucide-react";

const AttendancePage = () => {
  const [view, setView] = useState("daily");

  const todayAttendance = mockAttendance.filter((a) => a.date === "2025-01-17");

  const columns = [
    {
      header: "Employee",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-700">
              {row.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <span className="font-medium text-black/90">
            {row.employeeName}
          </span>
        </div>
      ),
    },
    { header: "Date", accessor: "date" },
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
  const absentCount = mockEmployees.length - todayAttendance.length;
  const lateCount = todayAttendance.filter((a) => a.status === "late").length;

  return (
    <div>
      <PageHeader
        title="Attendance"
        description="Track daily and monthly attendance"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Users className="h-10 w-10 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {mockEmployees.length}
              </p>
              <p className="text-sm text-black/80">Total</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{presentCount}</p>
              <p className="text-sm text-black/80">Present</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{absentCount}</p>
              <p className="text-sm text-black/80">Absent</p>
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
              <p className="text-sm text-black/80">Late</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="w-fit flex gap-1 p-1 rounded-lg bg-gray-300">
          <button
            onClick={() => setView("daily")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === "daily"
                ? "bg-background text-foreground shadow"
                : "text-muted-foreground hover:text-gray-600"
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === "monthly"
                ? "bg-background text-foreground shadow"
                : "text-muted-foreground hover:text-gray-600"
            }`}
          >
            Monthly View
          </button>
        </div>

        <div className={view === "daily" ? "block" : "hidden"}>
          <DataTable
            columns={columns}
            data={todayAttendance}
            emptyMessage="No attendance records for today"
          />
        </div>

        <div className={view === "monthly" ? "block" : "hidden"}>
          <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
            <div className="p-6 border-b border-gray-300 shadow-sm">
              <h3 className="text-black text-lg font-semibold">
                January 2025 Attendance
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-black/80 p-2"
                    >
                      {day}
                    </div>
                  )
                )}
                {Array.from({ length: 31 }, (_, i) => {
                  const date = i + 1;
                  const dayOfWeek = new Date(2025, 0, date).getDay();
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                  const hasAttendance = mockAttendance.some(
                    (a) => a.date === `2025-01-${String(date).padStart(2, "0")}`
                  );
                  return (
                    <div
                      key={date}
                      className={`text-center p-2 rounded-lg text-sm ${
                        isWeekend
                          ? "bg-gray-200 text-muted-foreground"
                          : hasAttendance
                          ? "bg-green-200 text-green-600"
                          : date <= 17
                          ? "bg-blue-200 text-blue-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {date}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
