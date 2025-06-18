interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconTextColor: string;
}

export default function StatCard({ title, value, icon, change, iconBgColor, iconTextColor }: StatCardProps) {
  return (
    <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-5 hover:border-[#4F46E5] transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#9CA3AF]">{title}</h3>
        <div className={`p-2 ${iconBgColor} rounded-md`}>
          <div className={iconTextColor}>{icon}</div>
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {change && (
        <p className="text-xs text-[#9CA3AF] mt-1">{change}</p>
      )}
    </div>
  );
}
