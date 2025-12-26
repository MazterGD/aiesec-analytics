"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { ChartDataPoint } from "../types/analytics";
import { METRIC_CONFIGS } from "../lib/constants";
import { BarChart3, LineChartIcon, AreaChartIcon } from "lucide-react";

interface TimeSeriesChartProps {
  data: ChartDataPoint[];
  selectedMetrics: string[];
  title: string;
}

type ChartType = "line" | "area" | "bar";

export default function TimeSeriesChart({
  data,
  selectedMetrics,
  title,
}: TimeSeriesChartProps) {
  const [chartType, setChartType] = useState<ChartType>("line");

  const getMetricColor = (key: string) => {
    const config = METRIC_CONFIGS.find((m) => m.key === key);
    return config?.color || "#6b7280";
  };

  const getMetricLabel = (key: string) => {
    const config = METRIC_CONFIGS.find((m) => m.key === key);
    return config?.label || key;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="rounded-xl shadow-lg p-3 bg-white"
          style={{ border: "1px solid #e8e4df" }}
        >
          <p className="font-medium mb-2 text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-500">
                {getMetricLabel(entry.dataKey)}:
              </span>
              <span className="font-medium text-gray-900">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <XAxis
              dataKey="formattedDate"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#6b7280" }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#6b7280" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            {selectedMetrics.map((metric) => (
              <Area
                key={metric}
                type="monotone"
                dataKey={metric}
                name={getMetricLabel(metric)}
                stroke={getMetricColor(metric)}
                fill={getMetricColor(metric)}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <XAxis
              dataKey="formattedDate"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#6b7280" }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#6b7280" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            {selectedMetrics.map((metric) => (
              <Bar
                key={metric}
                dataKey={metric}
                name={getMetricLabel(metric)}
                fill={getMetricColor(metric)}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <XAxis
              dataKey="formattedDate"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#6b7280" }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#6b7280" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            {selectedMetrics.map((metric) => (
              <Line
                key={metric}
                type="monotone"
                dataKey={metric}
                name={getMetricLabel(metric)}
                stroke={getMetricColor(metric)}
                strokeWidth={2}
                dot={{ fill: getMetricColor(metric), strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  // If no title, render without container (for embedding in parent container)
  if (!title) {
    return (
      <div>
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-1 rounded-xl p-1 bg-gray-100">
            <button
              onClick={() => setChartType("line")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                chartType === "line" ? "bg-white shadow-sm" : ""
              }`}
              title="Line Chart"
            >
              <LineChartIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setChartType("area")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                chartType === "area" ? "bg-white shadow-sm" : ""
              }`}
              title="Area Chart"
            >
              <AreaChartIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                chartType === "bar" ? "bg-white shadow-sm" : ""
              }`}
              title="Bar Chart"
            >
              <BarChart3 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6 bg-white"
      style={{
        border: "1px solid #e8e4df",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-1 rounded-xl p-1 bg-gray-100">
          <button
            onClick={() => setChartType("line")}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              chartType === "line" ? "bg-white shadow-sm" : ""
            }`}
            title="Line Chart"
          >
            <LineChartIcon className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => setChartType("area")}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              chartType === "area" ? "bg-white shadow-sm" : ""
            }`}
            title="Area Chart"
          >
            <AreaChartIcon className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              chartType === "bar" ? "bg-white shadow-sm" : ""
            }`}
            title="Bar Chart"
          >
            <BarChart3 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
