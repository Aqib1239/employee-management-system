"use client";

import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { getEmployeesByManager } from "@/data/mockData";
import { Users, Mail, Briefcase, Plus } from "lucide-react";

const TeamMembersPage = () => {
  const teamMembers = getEmployeesByManager("2");

  const columns = [
    {
      header: "Member",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-700">
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-black">{row.name}</p>
            <p className="text-xs text-black/80">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Position",
      accessor: (row) => (
        <span className="text-sm font-medium text-black">{row.position}</span>
      ),
    },
    {
      header: "Department",
      accessor: (row) => (
        <span className="text-sm font-medium text-black">{row.department}</span>
      ),
    },
    {
      header: "Join Date",
      accessor: (row) => (
        <span className="text-sm font-medium text-black">{row.joinDate}</span>
      ),
    },
    {
      header: "Status",
      accessor: (row) => (
        <StatusBadge status={row.status === "active" ? "present" : "absent"} />
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Team Members" description="Manage your team">
        <button className="border border-gray-300 shadow-md text-black/90 hover:bg-gray-900 hover:text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Users className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {teamMembers.length}
              </p>
              <p className="text-sm text-black/80">Total Members</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Mail className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">
                {teamMembers.filter((m) => m.status === "active").length}
              </p>
              <p className="text-sm text-black/80">Active</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow-md hover:shadow-lg rounded-lg">
          <div className="p-4 flex items-center gap-4">
            <div>
              <Briefcase className="h-10 w-10 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black">Engineering</p>
              <p className="text-sm text-black/80">Department</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={teamMembers}
        emptyMessage="No team members"
      />
    </div>
  );
};

export default TeamMembersPage;
