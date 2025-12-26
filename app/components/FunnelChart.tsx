"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface FunnelChartProps {
  data: {
    stage: string;
    value: number;
    color: string;
  }[];
}

export default function FunnelChart({ data }: FunnelChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map((d) => d.value));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage =
        maxValue > 0 ? ((item.value / maxValue) * 100).toFixed(1) : 0;

      return (
        <div
          className="rounded-xl shadow-lg p-3 bg-white"
          style={{ border: "1px solid #e8e4df" }}
        >
          <p className="font-medium text-gray-900">{item.stage}</p>
          <p className="text-sm text-gray-500">
            Count:{" "}
            <span className="font-medium">{item.value.toLocaleString()}</span>
          </p>
          <p className="text-sm text-gray-500">
            Ratio: <span className="font-medium">{percentage}%</span>
          </p>
          <p className="text-xs text-gray-400 mt-1 italic">
            Formula: ({item.value.toLocaleString()} ÷{" "}
            {maxValue.toLocaleString()}) × 100
          </p>
        </div>
      );
    }
    return null;
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
        Exchange Funnel
      </h3>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 80, left: 100, bottom: 5 }}
          >
            <XAxis
              type="number"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis
              type="category"
              dataKey="stage"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              width={95}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(value) =>
                  typeof value === "number"
                    ? value.toLocaleString()
                    : String(value)
                }
                style={{ fill: "#6b7280", fontSize: 12 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion rates with hover tooltips */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {data.slice(1).map((item, index) => {
          const prevValue = data[index].value;
          const convRate =
            prevValue > 0 ? ((item.value / prevValue) * 100).toFixed(1) : 0;

          return (
            <div
              key={item.stage}
              className="relative text-center p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md"
              style={{ backgroundColor: `${item.color}15` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <p className="text-xs text-gray-500 truncate">
                {data[index].stage} → {item.stage}
              </p>
              <p
                className="text-lg font-semibold"
                style={{ color: item.color }}
              >
                {convRate}%
              </p>

              {/* Hover tooltip showing equation */}
              {hoveredIndex === index && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                  <div className="font-medium mb-1">Conversion Rate</div>
                  <div className="text-gray-300">
                    ({item.value.toLocaleString()} ÷{" "}
                    {prevValue.toLocaleString()}) × 100 = {convRate}%
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
