"use client";

import { ChartDataPoint } from "../types/analytics";
import { METRIC_CONFIGS } from "../lib/constants";
import { calculateTrendAnalysis } from "../lib/analytics-utils";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface TrendAnalysisTableProps {
  data: ChartDataPoint[];
}

export default function TrendAnalysisTable({ data }: TrendAnalysisTableProps) {
  const trends = METRIC_CONFIGS.map((metric) => ({
    ...metric,
    analysis: calculateTrendAnalysis(data, metric.key),
  })).filter((t) => t.analysis !== null);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "decreasing":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "increasing":
        return { bg: "#dcfce7", text: "#16a34a" };
      case "decreasing":
        return { bg: "#fef2f2", text: "#dc2626" };
      default:
        return { bg: "var(--surface-warm)", text: "var(--text-muted)" };
    }
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
        Trend Analysis Summary
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Metric
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                Trend
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Change
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Average
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Peak
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Low
              </th>
            </tr>
          </thead>
          <tbody>
            {trends.map((item) => {
              const trendStyles = getTrendColor(item.analysis!.trend);
              return (
                <tr
                  key={item.key}
                  className="transition-colors border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {item.label}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: trendStyles.bg,
                          color: trendStyles.text,
                        }}
                      >
                        {getTrendIcon(item.analysis!.trend)}
                        {item.analysis!.trend.charAt(0).toUpperCase() +
                          item.analysis!.trend.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        item.analysis!.percentChange > 0
                          ? "text-green-600"
                          : item.analysis!.percentChange < 0
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {item.analysis!.percentChange > 0 && (
                        <ArrowUpRight className="w-3 h-3" />
                      )}
                      {item.analysis!.percentChange < 0 && (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {item.analysis!.percentChange > 0 ? "+" : ""}
                      {item.analysis!.percentChange}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-900">
                    {item.analysis!.average.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        {item.analysis!.max.value.toLocaleString()}
                      </span>
                      <span className="text-xs block text-gray-500">
                        {item.analysis!.max.date}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        {item.analysis!.min.value.toLocaleString()}
                      </span>
                      <span className="text-xs block text-gray-500">
                        {item.analysis!.min.date}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
