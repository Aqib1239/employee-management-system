"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import { getAttendanceByEmployee } from "@/data/mockData";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { Clock, LogIn, LogOut, CheckCircle } from "lucide-react";

const MyAttendancePage = () => {
  const [view, setView] = useState("daily");
  const [isPunchedIn, setIsPunchedIn] = useState(true);
  const [punchTime, setPunchTime] = useState("09:00");
  const myAttendance = getAttendanceByEmployee("3");

  const handlePunchIn = () => {
    const now = new Date();
    setPunchTime(
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
    setIsPunchedIn(true);
  };

  const handlePunchOut = () => {
    setIsPunchedIn(false);
  };

  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Punch In", accessor: (row) => row.punchIn || "-" },
    { header: "Punch Out", accessor: (row) => row.punchOut || "-" },
    { header: "Work Hours", accessor: (row) => `${row.workHours}h` },
    {
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const presentDays = myAttendance.filter(
    (a) => a.status === "present" || a.status === "late"
  ).length;
  const totalHours = myAttendance.reduce((sum, a) => sum + a.workHours, 0);

  return (
    <div>
      <PageHeader
        title="My Attendance"
        description="Track your daily attendance"
      />

      {/* Punch In/Out Card */}
      <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg mb-6">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-yellow-400">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-black/80">Today, January 17, 2025</p>
                <p className="text-2xl font-bold text-black">
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {isPunchedIn && (
                  <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                    <CheckCircle className="h-4 w-4" />
                    Punched in at {punchTime}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className={`px-3 py-1 rounded-md text-green-700 flex items-center ${
                  isPunchedIn
                    ? "bg-green-200 cursor-not-allowed border border-green-300"
                    : "bg-green-200 hover:bg-green-300 cursor-pointer"
                }`}
                disabled={isPunchedIn}
                onClick={handlePunchIn}
              >
                <LogIn className="h-5 w-5 mr-2" />
                Punch In
              </button>
              <button
                className={`px-3 py-1 rounded-md border flex items-center ${
                  !isPunchedIn
                    ? "text-red-600 cursor-not-allowed"
                    : "border-red-300 text-red-600 bg-red-200 hover:bg-red-300 cursor-pointer"
                }`}
                disabled={!isPunchedIn}
                onClick={handlePunchOut}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Punch Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{presentDays}</p>
              <p className="text-sm text-black/80">Days Present</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Clock className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{totalHours}h</p>
              <p className="text-sm text-black/80">Total Hours</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {(totalHours / presentDays || 0).toFixed(1)}h
              </p>
              <p className="text-sm text-black/80">Avg Hours/Day</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-300 rounded-lg p-1 inline-flex">
          <button
            className={`px-4 py-2 rounded-md ${
              view === "daily"
                ? "bg-black text-white"
                : "text-black/60 hover:text-black"
            }`}
            onClick={() => setView("daily")}
          >
            Daily View
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              view === "monthly"
                ? "bg-black text-white"
                : "text-black/60 hover:text-black"
            }`}
            onClick={() => setView("monthly")}
          >
            Monthly View
          </button>
        </div>

        {view === "daily" && (
          <DataTable
            columns={columns}
            data={myAttendance}
            emptyMessage="No attendance records"
          />
        )}

        {view === "monthly" && (
          <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="text-lg font-semibold text-black">
                January 2026
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-muted-foreground p-2"
                    >
                      {day}
                    </div>
                  )
                )}

                {Array.from({ length: 31 }, (_, i) => {
                  const date = i + 1;

                  // January 2026 (month index = 0)
                  const dayOfWeek = new Date(2026, 0, date).getDay();
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                  const attendance = myAttendance.find(
                    (a) => a.date === `2026-01-${String(date).padStart(2, "0")}`
                  );

                  const isToday = date === 16; // Jan 16, 2026 (Friday)

                  return (
                    <div
                      key={date}
                      className={`text-center p-2 rounded-lg text-sm ${
                        isToday
                          ? "bg-white text-blue-600 font-bold ring-2 ring-blue-200"
                          : attendance
                          ? attendance.status === "present"
                            ? "bg-green-200 text-green-700"
                            : attendance.status === "late"
                            ? "bg-yellow-200 text-yellow-700"
                            : attendance.status === "half-day"
                            ? "bg-slate-300 text-slate-800"
                            : "bg-red-200 text-red-700"
                          : isWeekend
                          ? "bg-blue-200 text-blue-700"
                          : date < 16
                          ? "bg-red-200 text-red-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {date}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-200" />
                  <span className="text-sm text-muted-foreground">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-200" />
                  <span className="text-sm text-muted-foreground">Late</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-slate-300" />
                  <span className="text-sm text-muted-foreground">
                    Half Day
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-200" />
                  <span className="text-sm text-muted-foreground">Absent</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAttendancePage;
