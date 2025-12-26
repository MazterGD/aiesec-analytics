"use client";

import { AnalyticsInsight } from "../types/analytics";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
} from "lucide-react";

interface InsightsPanelProps {
  insights: AnalyticsInsight[];
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  const getInsightIcon = (type: AnalyticsInsight["type"]) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "negative":
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getInsightStyles = (type: AnalyticsInsight["type"]) => {
    switch (type) {
      case "positive":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "negative":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
    }
  };

  if (insights.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Analytics Insights
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getInsightStyles(
              insight.type
            )}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {insight.title}
                  </h4>
                  {insight.value !== undefined && (
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {insight.value}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {insight.description}
                </p>
                {insight.change !== undefined && insight.change !== 0 && (
                  <div
                    className={`flex items-center gap-1 mt-2 text-sm font-medium ${
                      insight.change > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {insight.change > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {insight.change > 0 ? "+" : ""}
                    {insight.change}%
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
