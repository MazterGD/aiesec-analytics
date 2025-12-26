"use client";

import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "../types/analytics";

interface ComparativeChartProps {
  data: ChartDataPoint[];
}

const LEGEND_ITEMS = [
  {
    key: "total_applications",
    name: "Applications",
    color: "#3b82f6",
    type: "bar",
  },
  { key: "total_realized", name: "Realized", color: "#f59e0b", type: "bar" },
  { key: "total_completed", name: "Completed", color: "#22c55e", type: "bar" },
  {
    key: "matchRate",
    name: "Match Rate %",
    color: "#8b5cf6",
    type: "line",
    equation: "(Matched ÷ Applications) × 100",
  },
  {
    key: "completionRate",
    name: "Completion Rate %",
    color: "#06b6d4",
    type: "line",
    equation: "(Completed ÷ Realized) × 100",
  },
];

export default function ComparativeChart({ data }: ComparativeChartProps) {
  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null);

  // Calculate conversion metrics for each data point
  const enhancedData = data.map((point) => ({
    ...point,
    matchRate: point.total_applications
      ? (
          (((point.total_matched as number) || 0) /
            (point.total_applications as number)) *
          100
        ).toFixed(1)
      : 0,
    realizationRate: point.total_matched
      ? (
          (((point.total_realized as number) || 0) /
            (point.total_matched as number)) *
          100
        ).toFixed(1)
      : 0,
    completionRate: point.total_realized
      ? (
          (((point.total_completed as number) || 0) /
            (point.total_realized as number)) *
          100
        ).toFixed(1)
      : 0,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const applications =
        payload.find((p: any) => p.dataKey === "total_applications")?.value ||
        0;
      const realized =
        payload.find((p: any) => p.dataKey === "total_realized")?.value || 0;
      const completed =
        payload.find((p: any) => p.dataKey === "total_completed")?.value || 0;

      return (
        <div
          className="rounded-xl shadow-lg p-4 bg-white"
          style={{ border: "1px solid #e8e4df" }}
        >
          <p className="font-medium mb-3 text-gray-900">{label}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#3b82f6" }}
              />
              <span className="text-gray-500">Applications:</span>
              <span className="font-medium text-gray-900">
                {applications?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#f59e0b" }}
              />
              <span className="text-gray-500">Realized:</span>
              <span className="font-medium text-gray-900">
                {realized?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#22c55e" }}
              />
              <span className="text-gray-500">Completed:</span>
              <span className="font-medium text-gray-900">
                {completed?.toLocaleString() || 0}
              </span>
            </div>

            <hr className="my-2 border-gray-200" />

            <div className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#8b5cf6" }}
              />
              <span className="text-gray-500">Match Rate:</span>
              <span className="font-medium text-gray-900">
                {payload.find((p: any) => p.dataKey === "matchRate")?.value}%
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#06b6d4" }}
              />
              <span className="text-gray-500">Completion Rate:</span>
              <span className="font-medium text-gray-900">
                {
                  payload.find((p: any) => p.dataKey === "completionRate")
                    ?.value
                }
                %
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {LEGEND_ITEMS.map((item) => (
          <div
            key={item.key}
            className="relative flex items-center gap-2"
            onMouseEnter={() => item.equation && setHoveredLegend(item.key)}
            onMouseLeave={() => setHoveredLegend(null)}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">{item.name}</span>

            {/* Equation tooltip */}
            {hoveredLegend === item.key && item.equation && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                <div className="text-gray-300">{item.equation}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        ))}
      </div>
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
        Applications vs Conversions Analysis
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={enhancedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis
              dataKey="formattedDate"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Volume bars */}
            <Bar
              yAxisId="left"
              dataKey="total_applications"
              name="Applications"
              fill="#3b82f6"
              opacity={0.8}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="total_realized"
              name="Realized"
              fill="#f59e0b"
              opacity={0.8}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="total_completed"
              name="Completed"
              fill="#22c55e"
              opacity={0.8}
              radius={[4, 4, 0, 0]}
            />

            {/* Rate lines */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="matchRate"
              name="Match Rate %"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 3 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="completionRate"
              name="Completion Rate %"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ fill: "#06b6d4", strokeWidth: 2, r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />
    </div>
  );
}
