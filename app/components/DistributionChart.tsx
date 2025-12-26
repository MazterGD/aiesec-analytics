"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { AnalyticsResponse } from "../types/analytics";

interface DistributionChartProps {
  analytics: AnalyticsResponse;
}

export default function DistributionChart({
  analytics,
}: DistributionChartProps) {
  const data = [
    {
      name: "Pending",
      value:
        (analytics.analytics.total_applications?.doc_count || 0) -
        (analytics.analytics.total_matched?.doc_count || 0),
      color: "#94a3b8",
    },
    {
      name: "Matched (Pending)",
      value:
        (analytics.analytics.total_matched?.doc_count || 0) -
        (analytics.analytics.total_approvals?.doc_count || 0),
      color: "#8b5cf6",
    },
    {
      name: "Approved",
      value:
        (analytics.analytics.total_approvals?.doc_count || 0) -
        (analytics.analytics.total_realized?.doc_count || 0),
      color: "#06b6d4",
    },
    {
      name: "Realized",
      value:
        (analytics.analytics.total_realized?.doc_count || 0) -
        (analytics.analytics.total_finished?.doc_count || 0),
      color: "#f59e0b",
    },
    {
      name: "Finished",
      value:
        (analytics.analytics.total_finished?.doc_count || 0) -
        (analytics.analytics.total_completed?.doc_count || 0),
      color: "#ef4444",
    },
    {
      name: "Completed",
      value: analytics.analytics.total_completed?.doc_count || 0,
      color: "#22c55e",
    },
  ].filter((d) => d.value > 0);

  const totalApplications =
    analytics.analytics.total_applications?.doc_count || 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage =
        totalApplications > 0
          ? ((item.value / totalApplications) * 100).toFixed(1)
          : 0;

      return (
        <div
          className="rounded-xl shadow-lg p-3 bg-white"
          style={{ border: "1px solid #e8e4df" }}
        >
          <p className="font-medium text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500">
            Count:{" "}
            <span className="font-medium">{item.value.toLocaleString()}</span>
          </p>
          <p className="text-sm text-gray-500">
            Share: <span className="font-medium">{percentage}%</span>
          </p>
          <p className="text-xs text-gray-400 mt-1 italic">
            ({item.value.toLocaleString()} ÷{" "}
            {totalApplications.toLocaleString()}) × 100
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    if (percent < 0.05) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      className="rounded-3xl p-6 bg-white"
      style={{
        border: "1px solid #e8e4df",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
      }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Application Status Distribution
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              innerRadius={60}
              dataKey="value"
              strokeWidth={2}
              stroke="#fff"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              content={({ payload }) => (
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {payload?.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm text-gray-600">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
