"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { mockHolidays } from "@/data/mockData";
import { Calendar, Gift, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";

const CalendarPage = () => {
  const [view, setView] = useState("calendar");
  const [currentMonth, setCurrentMonth] = useState(0); // January 2025

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

  const publicHolidays = mockHolidays.filter((h) => h.type === "public");
  const restrictedHolidays = mockHolidays.filter(
    (h) => h.type === "restricted"
  );

  const getDaysInMonth = (month) => new Date(2025, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month) => new Date(2025, month, 1).getDay();

  const getHolidayForDate = (month, day) => {
    const dateStr = `2025-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return mockHolidays.find((h) => h.date === dateStr);
  };

  return (
    <div>
      <PageHeader
        title="Calendar & Holidays"
        description="View company holidays and events"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Calendar className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {mockHolidays.length}
              </p>
              <p className="text-sm text-black/80">Total Holidays</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Gift className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {publicHolidays.length}
              </p>
              <p className="text-sm text-black/80">Public Holidays</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <AlertCircle className="h-10 w-10 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {restrictedHolidays.length}
              </p>
              <p className="text-sm text-black/80">Restricted Holidays</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="w-fit flex gap-1 p-1 rounded-lg bg-gray-300">
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === "calendar"
                ? "bg-black text-white shadow"
                : "text-black/80 hover:text-gray-600"
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === "list"
                ? "bg-black text-white shadow"
                : "text-black/80 hover:text-gray-600"
            }`}
          >
            Holiday List
          </button>
        </div>

        <div className={view === "calendar" ? "block" : "hidden"}>
          <div className="border border-gray-300 shadow-md rounded-lg">
            <div className="p-6 border-b border-gray-300 shadow-sm flex items-center justify-between">
              <h3 className="text-black text-lg font-semibold">
                {months[currentMonth]} 2025
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
                  className="p-2 rounded-lg hover:bg-gray-200 text-muted-foreground"
                >
                  <ArrowLeft />
                </button>
                <button
                  onClick={() =>
                    setCurrentMonth(Math.min(11, currentMonth + 1))
                  }
                  className="p-2 rounded-lg hover:bg-gray-200 text-muted-foreground"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-semibold text-black/80 p-2"
                    >
                      {day}
                    </div>
                  )
                )}
                {Array.from(
                  { length: getFirstDayOfMonth(currentMonth) },
                  (_, i) => (
                    <div key={`empty-${i}`} className="p-2" />
                  )
                )}
                {Array.from(
                  { length: getDaysInMonth(currentMonth) },
                  (_, i) => {
                    const date = i + 1;
                    const dayOfWeek = new Date(
                      2025,
                      currentMonth,
                      date
                    ).getDay();
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                    const holiday = getHolidayForDate(currentMonth, date);
                    return (
                      <div
                        key={date}
                        className={`text-center p-2 rounded-lg text-sm relative group  ${
                          holiday
                            ? holiday.type === "public"
                              ? "bg-gray-300 text-gray-800 font-medium cursor-pointer"
                              : "bg-yellow-200 text-yellow-600 font-medium"
                            : isWeekend
                            ? "bg-red-200 text-black/80"
                            : "bg-blue-200 text-black"
                        }`}
                      >
                        {date}
                        {holiday && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                            <div className="text-xs p-2 bg-black text-white rounded-lg shadow-lg whitespace-nowrap">
                              {holiday.name}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-300" />
                  <span className="text-sm text-black/80">
                    Public Holiday
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-200" />
                  <span className="text-sm text-black/80">
                    Restricted Holiday
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={view === "list" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
              <div className="p-6 border-b border-gray-300 shadow-sm">
                <h3 className="text-black text-lg font-semibold flex items-center gap-2">
                  <Gift className="h-7 w-7 text-blue-600" />
                  Public Holidays
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {publicHolidays.map((holiday) => (
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
                      <StatusBadge status="public" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
              <div className="p-6 border-b border-gray-300 shadow-sm">
                <h3 className="text-black text-lg font-semibold flex items-center gap-2">
                  <AlertCircle className="h-7 w-7 text-yellow-500" />
                  Restricted Holidays
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {restrictedHolidays.map((holiday) => (
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
                      <StatusBadge status="restricted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
