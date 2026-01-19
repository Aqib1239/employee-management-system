"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Gift } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { mockHolidays } from "@/data/mockData";

const TeamCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(0);

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

  const upcomingHolidays = mockHolidays
    .filter((h) => new Date(h.date) >= new Date("2025-01-17"))
    .slice(0, 5);

  return (
    <div>
      <PageHeader title="Calendar" description="Company holidays and events" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="border border-gray-200 shadow-md rounded-lg lg:col-span-2">
          <div className="p-6 border-b border-gray-300 shadow flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold text-black">
              {months[currentMonth]} 2025
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
                className="p-2 rounded-lg hover:bg-gray-200 text-black/80"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))}
                className="p-2 rounded-lg hover:bg-gray-200 text-black/80"
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
                  className="text-center text-xs font-medium text-black/80 p-2"
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
                const isToday = currentMonth === 0 && date === 17;
                return (
                  <div
                    key={date}
                    className={`text-center p-2 rounded-lg text-sm relative group ${
                      isToday
                        ? "bg-white text-gray-700 font-bold ring-1 ring-gray-400"
                        : holiday
                        ? holiday.type === "public"
                          ? "bg-blue-200 text-blue-800 font-medium"
                          : "bg-yellow-200 text-yellow-600 font-medium"
                        : isWeekend
                        ? "bg-red-200 text-black/80"
                        : "bg-gray-200 text-black/80"
                    }`}
                  >
                    {date}
                    {holiday && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                        <div className="bg-black text-white text-xs p-2 rounded-lg shadow-lg whitespace-nowrap">
                          {holiday.name}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 shadow-md rounded-lg">
          <div className="p-6 border-b border-gray-300 shadow">
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
              <Gift className="h-7 w-7 text-black" />
              Upcoming Holidays
            </h3>
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
      </div>
    </div>
  );
};

export default TeamCalendarPage;
