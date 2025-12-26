"use client";

import { AnalyticsResponse } from "../types/analytics";
import { METRIC_CONFIGS } from "../lib/constants";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  BarChart3,
  CheckCircle,
  Target,
} from "lucide-react";

interface MetricCardsProps {
  analytics: AnalyticsResponse | null;
}

export default function MetricCards({ analytics }: MetricCardsProps) {
  if (!analytics) return null;

  const getMetricIcon = (key: string) => {
    switch (key) {
      case "total_applications":
        return <BarChart3 className="w-5 h-5" />;
      case "total_signup":
        return <Users className="w-5 h-5" />;
      case "total_completed":
        return <CheckCircle className="w-5 h-5" />;
      case "total_realized":
        return <Target className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  const calculateTrend = (buckets: { doc_count: number }[]) => {
    if (buckets.length < 2) return { trend: "stable", change: 0 };

    const recent =
      buckets.slice(-3).reduce((sum, b) => sum + b.doc_count, 0) / 3;
    const previous =
      buckets.slice(-6, -3).reduce((sum, b) => sum + b.doc_count, 0) / 3;

    if (previous === 0) return { trend: "stable", change: 0 };

    const change = ((recent - previous) / previous) * 100;
    const trend = change > 5 ? "up" : change < -5 ? "down" : "stable";

    return { trend, change: Math.round(change) };
  };

  const mainMetrics = [
    "total_applications",
    "total_matched",
    "total_realized",
    "total_completed",
    "total_signup",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {mainMetrics.map((metricKey) => {
        const config = METRIC_CONFIGS.find((m) => m.key === metricKey);
        const metricData =
          analytics.analytics[metricKey as keyof typeof analytics.analytics];

        if (!metricData || !config) return null;

        const buckets =
          metricData.applications?.buckets || metricData.people?.buckets || [];
        const { trend, change } = calculateTrend(buckets);

        return (
          <div
            key={metricKey}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <span style={{ color: config.color }}>
                  {getMetricIcon(metricKey)}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  trend === "up"
                    ? "text-green-600"
                    : trend === "down"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {trend === "up" && <TrendingUp className="w-4 h-4" />}
                {trend === "down" && <TrendingDown className="w-4 h-4" />}
                {trend === "stable" && <Minus className="w-4 h-4" />}
                {change !== 0 && `${change > 0 ? "+" : ""}${change}%`}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {metricData.doc_count.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {config.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
