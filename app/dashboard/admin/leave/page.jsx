"use client";

import { useState } from "react";
import { mockLeaveRequests } from "@/data/mockData";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

const LeavesPage = () => {
  const [leaves, setLeaves] = useState(mockLeaveRequests);

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
  const rejectedCount = leaves.filter((l) => l.status === "rejected").length;

  return (
    <div>
      <PageHeader
        title="Leave Management"
        description="Review and manage leave requests"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <FileText className="h-10 w-10 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{leaves.length}</p>
              <p className="text-sm text-black/80">Total Requests</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Clock className="h-10 w-10 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{pendingCount}</p>
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
              <p className="text-2xl font-bold text-black">{approvedCount}</p>
              <p className="text-sm text-black/80">Approved</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <XCircle className="h-10 w-10 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{rejectedCount}</p>
              <p className="text-sm text-black/80">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-300 shadow-md">
              <tr className="hover:bg-gray-200">
                <th className="text-black/80 text-left p-4 text-sm font-semibold">
                  Employee
                </th>
                <th className="text-black/80 text-left p-4 text-sm font-semibold">
                  Type
                </th>
                <th className="text-black/80 text-left p-4 text-sm font-semibold">
                  Duration
                </th>
                <th className="text-black/80 text-left p-4 text-sm font-semibold">
                  Reason
                </th>
                <th className="text-black/80 text-left p-4 text-sm font-semibold">
                  Applied On
                </th>
                <th className="text-black/80 text-left p-4 text-sm font-semibold">
                  Status
                </th>
                <th className="text-black/80 text-left p-4 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b border-gray-300 shadow-sm hover:bg-secondary/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center">
                        <span className="text-xs font-semibold text-red-600">
                          {leave.employeeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-black/80">
                        {leave.employeeName}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm p-4 capitalize text-black/80">
                    {leave.type}
                  </td>
                  <td className="text-sm p-4 text-black/80">
                    {leave.startDate} - {leave.endDate}
                  </td>
                  <td className="text-sm p-4 max-w-[200px] truncate text-black/80">
                    {leave.reason}
                  </td>
                  <td className="text-sm p-4 text-black/80">
                    {leave.appliedOn}
                  </td>
                  <td className="text-sm p-4">
                    <StatusBadge status={leave.status} />
                  </td>
                  <td className="p-4">
                    {leave.status === "pending" && (
                      <div className="flex items-center gap-2">
                        <button
                          className="h-8 px-2 text-green-700 hover:bg-green-200 rounded-full text-sm font-semibold"
                          onClick={() => handleApprove(leave.id)}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          className="h-8 px-2 text-red-700 hover:bg-red-200 rounded-full text-sm font-medium"
                          onClick={() => handleReject(leave.id)}
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeavesPage;
