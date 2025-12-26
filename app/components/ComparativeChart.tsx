"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "../types/analytics";

interface ComparativeChartProps {
  data: ChartDataPoint[];
}

export default function ComparativeChart({ data }: ComparativeChartProps) {
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
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
          <p className="font-medium text-gray-900 dark:text-white mb-3">
            {label}
          </p>

          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-gray-500">Applications: </span>
              <span className="font-medium text-blue-600">
                {payload
                  .find((p: any) => p.dataKey === "total_applications")
                  ?.value?.toLocaleString() || 0}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Realized: </span>
              <span className="font-medium text-amber-600">
                {payload
                  .find((p: any) => p.dataKey === "total_realized")
                  ?.value?.toLocaleString() || 0}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Completed: </span>
              <span className="font-medium text-green-600">
                {payload
                  .find((p: any) => p.dataKey === "total_completed")
                  ?.value?.toLocaleString() || 0}
              </span>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 my-2" />

            <div className="text-sm">
              <span className="text-gray-500">Match Rate: </span>
              <span className="font-medium text-purple-600">
                {payload.find((p: any) => p.dataKey === "matchRate")?.value}%
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Completion Rate: </span>
              <span className="font-medium text-cyan-600">
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Applications vs Conversions Analysis
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={enhancedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
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
            <Legend />

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
    </div>
  );
}
