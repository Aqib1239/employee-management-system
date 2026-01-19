import { cn } from "@/lib/utils";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}) => {
  return (
    <div
      className={`bg-card border border-gray-300 shadow-md rounded-xl hover:shadow-lg transition-all duration-200 ${className || ""}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-black/80">{title}</p>
            <p className="text-2xl font-bold text-black">{value}</p>
            {description && (
              <p className="text-xs text-black/80">{description}</p>
            )}
            {trend && (
              <p
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-success" : "text-destructive"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}% from last month
              </p>
            )}
          </div>
          <div>
            <Icon className="h-12 w-12 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
