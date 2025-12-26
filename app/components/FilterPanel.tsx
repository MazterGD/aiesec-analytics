"use client";

import { Calendar } from "lucide-react";
import { FilterParams } from "../types/analytics";
import { INTERVAL_OPTIONS } from "../lib/constants";

interface FilterPanelProps {
  filters: FilterParams;
  onFiltersChange: (filters: FilterParams) => void;
  onApply: () => void;
  isLoading: boolean;
}

export default function FilterPanel({
  filters,
  onFiltersChange,
  onApply,
  isLoading,
}: FilterPanelProps) {
  const updateFilter = <K extends keyof FilterParams>(
    key: K,
    value: FilterParams[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div
      className="rounded-3xl p-6 mb-6 bg-white"
      style={{
        border: "1px solid #e8e4df",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
      }}
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Filter Parameters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-500">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => updateFilter("startDate", e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 border border-gray-200 text-gray-900"
            />
          </div>
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-500">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => updateFilter("endDate", e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 border border-gray-200 text-gray-900"
            />
          </div>
        </div>

        {/* Interval */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-500">
            Interval
          </label>
          <select
            value={filters.interval}
            onChange={(e) =>
              updateFilter(
                "interval",
                e.target.value as FilterParams["interval"]
              )
            }
            className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-gray-50 border border-gray-200 text-gray-900"
          >
            {INTERVAL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Apply Button */}
        <div className="flex items-end">
          <button
            onClick={onApply}
            disabled={isLoading}
            className="w-full px-6 py-3 font-medium rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 text-white hover:opacity-90"
            style={{ background: "#037EF3" }}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Fetch Data"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
