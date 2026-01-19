import { cn } from "@/lib/utils";

const StatusBadge = ({ status, className }) => {
  // Color variants for different statuses
  const variants = {
    pending: "bg-amber-100 text-amber-800 border border-amber-400",
    approved: "bg-emerald-200 text-emerald-800 border border-emerald-400",
    rejected: "bg-red-200 text-red-800 border border-red-400",
    present: "bg-emerald-200 text-emerald-800 border border-emerald-400",
    absent: "bg-red-200 text-red-800 border border-red-400",
    "half-day": "bg-amber-100 text-amber-800 border border-amber-400",
    late: "bg-red-200 text-red-800 border border-red-400",
    paid: "bg-emerald-200 text-emerald-800 border border-emerald-400",
    public: "bg-blue-200 text-blue-800 border border-blue-400",
    restricted: "bg-red-200 text-red-800 border border-red-400",
  };

  // Text labels for different statuses
  const labels = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    present: "Present",
    absent: "Absent",
    "half-day": "Half Day",
    late: "Late",
    paid: "Paid",
    public: "Public",
    restricted: "Restricted",
  };

  // Get the styling for this specific status
  const variantClass =
    variants[status] || "bg-gray-100 text-gray-800 border-gray-200";

  // Get the label for this specific status
  const label = labels[status] || status;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantClass,
        className
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
