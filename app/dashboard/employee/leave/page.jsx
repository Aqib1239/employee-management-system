"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { getLeavesByEmployee } from "@/data/mockData";
import { FileText, Plus, Calendar, Clock, CheckCircle, X } from "lucide-react";

const MyLeavesPage = () => {
  const initialLeaves = getLeavesByEmployee("3");
  const [leaves, setLeaves] = useState(initialLeaves);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLeave, setNewLeave] = useState({
    type: "casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const leaveBalance = { annual: 12, sick: 8, casual: 5, emergency: 3 };
  const usedLeaves = {
    annual: leaves.filter((l) => l.type === "annual" && l.status === "approved")
      .length,
    sick: leaves.filter((l) => l.type === "sick" && l.status === "approved")
      .length,
    casual: leaves.filter((l) => l.type === "casual" && l.status === "approved")
      .length,
    emergency: 0,
  };

  const handleSubmit = () => {
    const leave = {
      id: String(Date.now()),
      employeeId: "3",
      employeeName: "Mike Employee",
      type: newLeave.type,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      reason: newLeave.reason,
      status: "pending",
      appliedOn: new Date().toISOString().split("T")[0],
    };
    setLeaves([leave, ...leaves]);
    setNewLeave({ type: "casual", startDate: "", endDate: "", reason: "" });
    setIsDialogOpen(false);
  };

  const columns = [
    { header: "Type", accessor: "type", className: "capitalize" },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    {
      header: "Reason",
      accessor: "reason",
      className: "max-w-[200px] truncate",
    },
    { header: "Applied On", accessor: "appliedOn" },
    {
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="My Leaves"
        description="Apply for leave and view your history"
      >
        <div>
          <button
            className={`px-4 py-2 rounded-lg border-2 border-blue-600 hover:bg-blue-600 text-blue-700 hover:text-white flex items-center cursor-pointer transition-colors duration-200 ${
              isDialogOpen ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setIsDialogOpen(true)}
            disabled={isDialogOpen}
          >
            <Plus className="h-4 w-4 mr-2" />
            Apply Leave
          </button>
        </div>
      </PageHeader>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black/80">Annual Leave</p>
                <p className="text-2xl font-bold text-black">
                  {leaveBalance.annual - usedLeaves.annual}
                </p>
              </div>
              <div>
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-black/80 mt-2">
              {usedLeaves.annual} used of {leaveBalance.annual}
            </p>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black/80">Sick Leave</p>
                <p className="text-2xl font-bold text-black">
                  {leaveBalance.sick - usedLeaves.sick}
                </p>
              </div>
              <div>
                <FileText className="h-10 w-10 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-black/80 mt-2">
              {usedLeaves.sick} used of {leaveBalance.sick}
            </p>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black/80">Casual Leave</p>
                <p className="text-2xl font-bold text-black">
                  {leaveBalance.casual - usedLeaves.casual}
                </p>
              </div>
              <div>
                <Clock className="h-10 w-10 text-yellow-500" />
              </div>
            </div>
            <p className="text-xs text-black/80 mt-2">
              {usedLeaves.casual} used of {leaveBalance.casual}
            </p>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lgr rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black/80">Emergency</p>
                <p className="text-2xl font-bold text-black">
                  {leaveBalance.emergency}
                </p>
              </div>
              <div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Available when needed
            </p>
          </div>
        </div>
      </div>

      {/* Leave History */}
      <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
        <div className="p-6 border-b border-gray-300 shadow">
          <div className="text-lg font-semibold text-black">Leave History</div>
        </div>
        <div className="p-0">
          <DataTable
            columns={columns}
            data={leaves}
            emptyMessage="No leave requests"
          />
        </div>
      </div>

      {/* Apply Leave Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 backdrop-blur-xs backdrop-brightness-90 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 shadow-md rounded-lg w-full max-w-md mx-4">
            <div className="relative p-6 border-b border-gray-300 shadow">
              <div className="text-lg font-semibold text-black">
                Apply for Leave
              </div>

              <div className="text-xs text-black/80 italic">
                Fill in the details below to submit your leave request
              </div>

              <button
                className="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-200"
                onClick={() => setIsDialogOpen(false)}
              >
                <X
                  size={20}
                  className="transition-transform hover:rotate-90 duration-300"
                />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-black block">Leave Type</label>
                <select
                  value={newLeave.type}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, type: e.target.value })
                  }
                  className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 text-black/80"
                >
                  <option value="casual" className="text-xs">
                    Casual Leave
                  </option>
                  <option value="sick" className="text-xs">
                    Sick Leave
                  </option>
                  <option value="annual" className="text-xs">
                    Annual Leave
                  </option>
                  <option value="emergency" className="text-xs">
                    Emergency Leave
                  </option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-black block">Start Date</label>
                  <input
                    type="date"
                    value={newLeave.startDate}
                    onChange={(e) =>
                      setNewLeave({ ...newLeave, startDate: e.target.value })
                    }
                    className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 text-black/80"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-black block">End Date</label>
                  <input
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) =>
                      setNewLeave({ ...newLeave, endDate: e.target.value })
                    }
                    className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 text-black/80"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-black block">Reason</label>
                <textarea
                  placeholder="Enter your reason for leave..."
                  value={newLeave.reason}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, reason: e.target.value })
                  }
                  className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 text-black/80 min-h-[100px]"
                />
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                onClick={handleSubmit}
                disabled={
                  !newLeave.startDate || !newLeave.endDate || !newLeave.reason
                }
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLeavesPage;
