"use client";

import { useState, useCallback } from "react";
import { format, subMonths } from "date-fns";
import { BarChart3, AlertCircle } from "lucide-react";
import {
  FilterPanel,
  MetricCards,
  MetricSelector,
  TimeSeriesChart,
  FunnelChart,
  InsightsPanel,
  ComparativeChart,
  TrendAnalysisTable,
  DistributionChart,
} from "./components";
import {
  FilterParams,
  AnalyticsResponse,
  ChartDataPoint,
  AnalyticsInsight,
} from "./types/analytics";
import {
  transformAnalyticsData,
  generateInsights,
  calculateFunnelData,
} from "./lib/analytics-utils";
import { DEMO_DATA } from "./lib/constants";

export default function AnalyticsDashboard() {
  const [filters, setFilters] = useState<FilterParams>({
    startDate: format(subMonths(new Date(), 12), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    interval: "month",
  });

  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(
    DEMO_DATA
  );
  const [chartData, setChartData] = useState<ChartDataPoint[]>(
    transformAnalyticsData(DEMO_DATA)
  );
  const [insights, setInsights] = useState<AnalyticsInsight[]>(
    generateInsights(transformAnalyticsData(DEMO_DATA), DEMO_DATA)
  );
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "total_applications",
    "total_matched",
    "total_realized",
    "total_completed",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingDemoData, setIsUsingDemoData] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        start_date: filters.startDate,
        end_date: filters.endDate,
        interval: filters.interval,
      });

      const response = await fetch(`/api/analytics?${params}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch analytics");
      }

      const data: AnalyticsResponse = await response.json();
      setAnalytics(data);

      const transformed = transformAnalyticsData(data);
      setChartData(transformed);
      setInsights(generateInsights(transformed, data));
      setIsUsingDemoData(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const funnelData = analytics ? calculateFunnelData(analytics) : [];

  return (
    <div className="min-h-screen" style={{ background: "#f8f5f1" }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-2xl"
                style={{ background: "#037EF3" }}
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  AIESEC Analytics
                </h1>
                <p className="text-sm text-gray-700">
                  Exchange Performance Dashboard
                </p>
              </div>
            </div>

            {isUsingDemoData && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-600"
                style={{ background: "transparent" }}
              >
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">
                  Demo Data
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div
            className="mb-6 p-4 rounded-2xl flex items-center gap-3"
            style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
          >
            <AlertCircle className="w-5 h-5" style={{ color: "#dc2626" }} />
            <span style={{ color: "#991b1b" }}>{error}</span>
          </div>
        )}

        {/* Filters */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          onApply={fetchAnalytics}
          isLoading={isLoading}
        />

        {/* Metric Cards */}
        <MetricCards analytics={analytics} />

        {/* Insights Panel */}
        {insights.length > 0 && (
          <div className="mb-6">
            <InsightsPanel insights={insights} />
          </div>
        )}

        {/* Metric Selector + Time Series Chart Combined */}
        {chartData.length > 0 && (
          <div
            className="rounded-3xl p-6 mb-6 bg-white"
            style={{
              border: "1px solid #e8e4df",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
            }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Exchange Metrics Over Time
            </h3>

            <MetricSelector
              selectedMetrics={selectedMetrics}
              onMetricsChange={setSelectedMetrics}
            />

            {selectedMetrics.length > 0 && (
              <div className="mt-6">
                <TimeSeriesChart
                  data={chartData}
                  selectedMetrics={selectedMetrics}
                  title=""
                />
              </div>
            )}
          </div>
        )}

        {/* Two Column Layout for Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Funnel Chart */}
          {funnelData.length > 0 && <FunnelChart data={funnelData} />}

          {/* Distribution Chart */}
          {analytics && <DistributionChart analytics={analytics} />}
        </div>

        {/* Comparative Analysis Chart */}
        {chartData.length > 0 && (
          <div className="mb-6">
            <ComparativeChart data={chartData} />
          </div>
        )}

        {/* Trend Analysis Table */}
        {chartData.length > 0 && (
          <div className="mb-6">
            <TrendAnalysisTable data={chartData} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 py-6 text-center border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Data source: AIESEC GIS Analytics API •
            {isUsingDemoData ? " Showing demo data" : " Live data"}
          </p>
        </footer>
      </main>
    </div>
  );
}
