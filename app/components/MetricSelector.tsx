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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Select Metrics to Display
        </h3>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            Select All
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-transparent shadow-md"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              }`}
              style={{
                backgroundColor: isSelected ? `${metric.color}20` : undefined,
                borderColor: isSelected ? metric.color : undefined,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: metric.color }}
              />
              <span
                className={`text-sm font-medium ${
                  isSelected
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
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
