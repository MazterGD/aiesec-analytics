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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-600">
          Select Metrics to Display
        </h4>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border border-blue-200 hover:bg-blue-100 cursor-pointer"
            style={{ background: "#e0f2fe", color: "#037EF3" }}
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 border-2 hover:scale-105 hover:shadow-md cursor-pointer"
              style={{
                backgroundColor: isSelected ? `${metric.color}15` : "#f9fafb",
                borderColor: isSelected ? metric.color : "transparent",
              }}
              title={metric.description}
            >
              <div
                className="w-2.5 h-2.5 rounded-full transition-transform duration-200 group-hover:scale-125"
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
