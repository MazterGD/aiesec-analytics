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
    "total_signup",
    "total_matched",
    "total_applications",
    "total_an_accepted",
    "total_approvals",
    "total_realized",
    "total_finished",
    "total_completed",
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
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
            className="group rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl bg-white"
            style={{
              border: "1px solid #e8e4df",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
            }}
            title={config.description}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="p-2.5 rounded-xl"
                style={{ backgroundColor: `${config.color}15` }}
              >
                <span style={{ color: config.color }}>
                  {getMetricIcon(metricKey)}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  trend === "up"
                    ? "text-green-600 bg-green-100"
                    : trend === "down"
                    ? "text-red-600 bg-red-100"
                    : "text-gray-500 bg-gray-100"
                }`}
              >
                {trend === "up" && <TrendingUp className="w-3 h-3" />}
                {trend === "down" && <TrendingDown className="w-3 h-3" />}
                {trend === "stable" && <Minus className="w-3 h-3" />}
                {change !== 0 && `${change > 0 ? "+" : ""}${change}%`}
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              {metricData.doc_count.toLocaleString()}
            </h3>
            <p className="text-sm mt-1 text-gray-500 font-medium">
              {config.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
