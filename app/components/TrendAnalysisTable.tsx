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
        return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "decreasing":
        return "text-red-600 bg-red-50 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-700";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Trend Analysis Summary
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Metric
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Trend
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Change
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Average
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Peak
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Low
              </th>
            </tr>
          </thead>
          <tbody>
            {trends.map((item) => (
              <tr
                key={item.key}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(
                        item.analysis!.trend
                      )}`}
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
                <td className="py-3 px-4 text-right text-sm text-gray-900 dark:text-white">
                  {item.analysis!.average.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.analysis!.max.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">
                      {item.analysis!.max.date}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.analysis!.min.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">
                      {item.analysis!.min.date}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
