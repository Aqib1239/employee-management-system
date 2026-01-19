"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { getTeamLeaveRequests } from "@/data/mockData";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

const TeamLeavesPage = () => {
  const initialLeaves = getTeamLeaveRequests("2");
  const [leaves, setLeaves] = useState(initialLeaves);

  const handleApprove = (id) => {
    setLeaves(
      leaves.map((l) => (l.id === id ? { ...l, status: "approved" } : l))
    );
  };

  const handleReject = (id) => {
    setLeaves(
      leaves.map((l) => (l.id === id ? { ...l, status: "rejected" } : l))
    );
  };

  const pendingCount = leaves.filter((l) => l.status === "pending").length;
  const approvedCount = leaves.filter((l) => l.status === "approved").length;

  return (
    <div>
      <PageHeader
        title="Leave Approvals"
        description="Review and manage your team's leave requests"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {leaves.length}
              </p>
              <p className="text-sm text-black/80">Total Requests</p>
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
                {pendingCount}
              </p>
              <p className="text-sm text-black/80">Pending</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {approvedCount}
              </p>
              <p className="text-sm text-black/80">Approved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 shadow-sm">
                <th className="text-sm text-left p-4 text-black/70 font-semibold">
                  Employee
                </th>
                <th className="text-sm text-left p-4 text-black/70 font-semibold">
                  Type
                </th>
                <th className="text-sm text-left p-4 text-black/70 font-semibold">
                  Duration
                </th>
                <th className="text-sm text-left p-4 text-black/70 font-semibold">
                  Reason
                </th>
                <th className="text-sm text-left p-4 text-black/70 font-semibold">
                  Status
                </th>
                <th className="text-sm text-left p-4 text-black/70 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground p-4"
                  >
                    No leave requests from your team
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => (
                  <tr key={leave.id} className="border-b border-gray-300 shadow">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-700">
                            {leave.employeeName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="font-medium text-sm text-black">
                          {leave.employeeName}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm capitalize text-black">
                      {leave.type}
                    </td>
                    <td className="p-4 text-sm text-black">
                      {leave.startDate} - {leave.endDate}
                    </td>
                    <td className="p-4 max-w-[200px] text-sm truncate text-black">
                      {leave.reason}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={leave.status} />
                    </td>
                    <td className="p-4">
                      {leave.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <button
                            className="h-8 px-2 rounded-xl text-green-600 hover:text-green-700 hover:bg-green-200 transition-colors duration-200"
                            onClick={() => handleApprove(leave.id)}
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            className="h-8 px-2 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-200 transition-colors duration-200"
                            onClick={() => handleReject(leave.id)}
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamLeavesPage;
