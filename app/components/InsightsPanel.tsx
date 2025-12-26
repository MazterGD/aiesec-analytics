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
        return { bg: "#dcfce7", border: "#86efac", textColor: "#166534" };
      case "negative":
        return { bg: "#fef9c3", border: "#fde047", textColor: "#854d0e" };
      case "warning":
        return { bg: "#fef9c3", border: "#fde047", textColor: "#854d0e" };
      default:
        return { bg: "#e0f2fe", border: "#7dd3fc", textColor: "#0369a1" };
    }
  };

  if (insights.length === 0) return null;

  return (
    <div
      className="rounded-3xl p-6 bg-white"
      style={{
        border: "1px solid #e8e4df",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Analytics Insights
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const styles = getInsightStyles(insight.type);
          return (
            <div
              key={index}
              className="p-4 rounded-2xl"
              style={{
                background: styles.bg,
                border: `1px solid ${styles.border}`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className="font-medium text-sm"
                      style={{ color: styles.textColor }}
                    >
                      {insight.title}
                    </h4>
                    {insight.value !== undefined && (
                      <span
                        className="text-lg font-bold"
                        style={{ color: styles.textColor }}
                      >
                        {insight.value}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm mt-1"
                    style={{ color: styles.textColor, opacity: 0.8 }}
                  >
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
          );
        })}
      </div>
    </div>
  );
}
