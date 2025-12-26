"use client";

import { METRIC_CONFIGS } from "../lib/constants";

interface MetricSelectorProps {
  selectedMetrics: string[];
  onMetricsChange: (metrics: string[]) => void;
}

export default function MetricSelector({
  selectedMetrics,
  onMetricsChange,
}: MetricSelectorProps) {
  const toggleMetric = (metricKey: string) => {
    if (selectedMetrics.includes(metricKey)) {
      onMetricsChange(selectedMetrics.filter((m) => m !== metricKey));
    } else {
      onMetricsChange([...selectedMetrics, metricKey]);
    }
  };

  const selectAll = () => {
    onMetricsChange(METRIC_CONFIGS.map((m) => m.key));
  };

  const clearAll = () => {
    onMetricsChange([]);
  };

  return (
    <div
      className="rounded-3xl p-6 mb-6 bg-white"
      style={{
        border: "1px solid #e8e4df",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Select Metrics to Display
        </h3>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="px-4 py-2 text-sm font-medium rounded-xl transition-colors border border-blue-200 hover:bg-blue-100"
            style={{ background: "#e0f2fe", color: "#037EF3" }}
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 text-sm font-medium rounded-xl transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {METRIC_CONFIGS.map((metric) => {
          const isSelected = selectedMetrics.includes(metric.key);

          return (
            <button
              key={metric.key}
              onClick={() => toggleMetric(metric.key)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all border-2"
              style={{
                backgroundColor: isSelected ? `${metric.color}15` : "#f9fafb",
                borderColor: isSelected ? metric.color : "transparent",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: metric.color }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: isSelected ? "#1f2937" : "#6b7280" }}
              >
                {metric.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
