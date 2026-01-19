"use client";

import { useState } from "react";
import { Gift, CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { getLeavesByEmployee, mockHolidays } from "@/data/mockData";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

const EmployeeCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const myLeaves = getLeavesByEmployee("3").filter(
    (l) => l.status === "approved"
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month) => new Date(2025, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month) => new Date(2025, month, 1).getDay();

  const getHolidayForDate = (month, day) => {
    const dateStr = `2025-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return mockHolidays.find((h) => h.date === dateStr);
  };

  const getLeaveForDate = (month, day) => {
    const dateStr = `2025-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return myLeaves.find((l) => {
      const start = new Date(l.startDate);
      const end = new Date(l.endDate);
      const current = new Date(dateStr);
      return current >= start && current <= end;
    });
  };

  const upcomingHolidays = mockHolidays
    .filter((h) => new Date(h.date) >= new Date("2025-01-17"))
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Calendar"
        description="View holidays and your leave schedule"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="border border-gray-300 shadow-md rounded-lg lg:col-span-2">
          <div className="p-6 border-b border-gray-300 shadow flex flex-row items-center justify-between">
            <div className="text-lg font-semibold text-black">
              {months[currentMonth]} 2025
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
                className="p-1 rounded-lg hover:bg-slate-200 text-black/80"
              >
               <ArrowLeft />
              </button>
              <button
                onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))}
                className="p-1 rounded-lg hover:bg-slate-200 text-black/80"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-black/80 p-2"
                >
                  {day}
                </div>
              ))}
              {Array.from(
                { length: getFirstDayOfMonth(currentMonth) },
                (_, i) => (
                  <div key={`empty-${i}`} className="p-2" />
                )
              )}
              {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                const date = i + 1;
                const dayOfWeek = new Date(2025, currentMonth, date).getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const holiday = getHolidayForDate(currentMonth, date);
                const leave = getLeaveForDate(currentMonth, date);
                const isToday = currentMonth === 0 && date === 17;
                return (
                  <div
                    key={date}
                    className={`text-center p-2 rounded-lg text-sm relative group ${
                      isToday
                        ? "bg-white text-black font-bold ring-1"
                        : leave
                        ? "bg-red-100 text-black font-medium"
                        : holiday
                        ? holiday.type === "public"
                          ? "bg-blue-100 text-black font-medium"
                          : "bg-yellow-100 text-yellow-100 font-medium"
                        : isWeekend
                        ? "bg-gray-200 text-black/70"
                        : "bg-white text-black"
                    }`}
                  >
                    {date}
                    {(holiday || leave) && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                        <div className=" text-xs p-2 bg-black text-white rounded shadow-lg whitespace-nowrap">
                          {holiday?.name || leave?.type + " Leave"}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-100" />
                <span className="text-sm text-black/80">
                  Public Holiday
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-100" />
                <span className="text-sm text-black/80">
                  Restricted Holiday
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-100" />
                <span className="text-sm text-black/80">
                  Your Leave
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-gray-300 shadow-md rounded-lg">
            <div className="p-6 border-b border-gray-300 shadow">
              <div className="text-lg font-semibold text-black flex items-center gap-2">
                <Gift className="h-7 w-7 text-black" />
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
                      <p className="font-medium text-black text-sm">
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

          <div className="border border-gray-300 shadow-md rounded-lg">
            <div className="p-6 border-b border-gray-300 shadow">
              <div className="text-lg font-semibold text-black flex items-center gap-2">
                <CalendarIcon className="h-7 w-7 text-black" />
                Your Approved Leaves
              </div>
            </div>
            <div className="p-6">
              {myLeaves.length === 0 ? (
                <p className="text-sm text-black/80 text-center py-4">
                  No approved leaves
                </p>
              ) : (
                <div className="space-y-3">
                  {myLeaves.map((leave) => (
                    <div key={leave.id} className="p-3 rounded-lg bg-green-200 border border-green-300 shadow">
                      <p className="font-medium text-black text-sm capitalize">
                        {leave.type} Leave
                      </p>
                      <p className="text-xs text-black/80">
                        {leave.startDate} - {leave.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCalendarPage;