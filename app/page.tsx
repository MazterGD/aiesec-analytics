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

// Demo data for initial display
const DEMO_DATA: AnalyticsResponse = {
  analytics: {
    total_remote_realized: {
      doc_count: 0,
      applications: {
        buckets: [
          { key_as_string: "2024-07-01", key: 1719792000000, doc_count: 0 },
          { key_as_string: "2024-08-01", key: 1722470400000, doc_count: 0 },
          { key_as_string: "2024-09-01", key: 1725148800000, doc_count: 0 },
          { key_as_string: "2024-10-01", key: 1727740800000, doc_count: 0 },
          { key_as_string: "2024-11-01", key: 1730419200000, doc_count: 0 },
          { key_as_string: "2024-12-01", key: 1733011200000, doc_count: 0 },
          { key_as_string: "2025-01-01", key: 1735689600000, doc_count: 0 },
          { key_as_string: "2025-02-01", key: 1738368000000, doc_count: 0 },
          { key_as_string: "2025-03-01", key: 1740787200000, doc_count: 0 },
          { key_as_string: "2025-04-01", key: 1743465600000, doc_count: 0 },
          { key_as_string: "2025-05-01", key: 1746057600000, doc_count: 0 },
          { key_as_string: "2025-06-01", key: 1748736000000, doc_count: 0 },
        ],
      },
    },
    total_completed: {
      doc_count: 104,
      applications: {
        buckets: [
          { key_as_string: "2024-07-01", key: 1719792000000, doc_count: 10 },
          { key_as_string: "2024-08-01", key: 1722470400000, doc_count: 29 },
          { key_as_string: "2024-09-01", key: 1725148800000, doc_count: 29 },
          { key_as_string: "2024-10-01", key: 1727740800000, doc_count: 5 },
          { key_as_string: "2024-11-01", key: 1730419200000, doc_count: 2 },
          { key_as_string: "2024-12-01", key: 1733011200000, doc_count: 6 },
          { key_as_string: "2025-01-01", key: 1735689600000, doc_count: 1 },
          { key_as_string: "2025-02-01", key: 1738368000000, doc_count: 7 },
          { key_as_string: "2025-03-01", key: 1740787200000, doc_count: 4 },
          { key_as_string: "2025-04-01", key: 1743465600000, doc_count: 4 },
          { key_as_string: "2025-05-01", key: 1746057600000, doc_count: 2 },
          { key_as_string: "2025-06-01", key: 1748736000000, doc_count: 5 },
        ],
      },
    },
    total_finished: {
      doc_count: 203,
      applications: {
        buckets: [
          { key_as_string: "2024-07-01", key: 1719792000000, doc_count: 24 },
          { key_as_string: "2024-08-01", key: 1722470400000, doc_count: 66 },
          { key_as_string: "2024-09-01", key: 1725148800000, doc_count: 47 },
          { key_as_string: "2024-10-01", key: 1727740800000, doc_count: 10 },
          { key_as_string: "2024-11-01", key: 1730419200000, doc_count: 5 },
          { key_as_string: "2024-12-01", key: 1733011200000, doc_count: 10 },
          { key_as_string: "2025-01-01", key: 1735689600000, doc_count: 5 },
          { key_as_string: "2025-02-01", key: 1738368000000, doc_count: 13 },
          { key_as_string: "2025-03-01", key: 1740787200000, doc_count: 6 },
          { key_as_string: "2025-04-01", key: 1743465600000, doc_count: 8 },
          { key_as_string: "2025-05-01", key: 1746057600000, doc_count: 2 },
          { key_as_string: "2025-06-01", key: 1748736000000, doc_count: 7 },
        ],
      },
    },
    total_realized: {
      doc_count: 243,
      applications: {
        buckets: [
          { key_as_string: "2024-07-01", key: 1719792000000, doc_count: 75 },
          { key_as_string: "2024-08-01", key: 1722470400000, doc_count: 24 },
          { key_as_string: "2024-09-01", key: 1725148800000, doc_count: 14 },
          { key_as_string: "2024-10-01", key: 1727740800000, doc_count: 15 },
          { key_as_string: "2024-11-01", key: 1730419200000, doc_count: 7 },
          { key_as_string: "2024-12-01", key: 1733011200000, doc_count: 4 },
          { key_as_string: "2025-01-01", key: 1735689600000, doc_count: 11 },
          { key_as_string: "2025-02-01", key: 1738368000000, doc_count: 7 },
          { key_as_string: "2025-03-01", key: 1740787200000, doc_count: 7 },
          { key_as_string: "2025-04-01", key: 1743465600000, doc_count: 6 },
          { key_as_string: "2025-05-01", key: 1746057600000, doc_count: 10 },
          { key_as_string: "2025-06-01", key: 1748736000000, doc_count: 63 },
        ],
      },
    },
    total_an_accepted: {
      doc_count: 674,
      applications: {
        buckets: [
          { key_as_string: "2024-07-01", key: 1719792000000, doc_count: 42 },
          { key_as_string: "2024-08-01", key: 1722470400000, doc_count: 25 },
          { key_as_string: "2024-09-01", key: 1725148800000, doc_count: 19 },
          { key_as_string: "2024-10-01", key: 1727740800000, doc_count: 36 },
          { key_as_string: "2024-11-01", key: 1730419200000, doc_count: 128 },
          { key_as_string: "2024-12-01", key: 1733011200000, doc_count: 41 },
          { key_as_string: "2025-01-01", key: 1735689600000, doc_count: 17 },
          { key_as_string: "2025-02-01", key: 1738368000000, doc_count: 26 },
          { key_as_string: "2025-03-01", key: 1740787200000, doc_count: 65 },
          { key_as_string: "2025-04-01", key: 1743465600000, doc_count: 175 },
          { key_as_string: "2025-05-01", key: 1746057600000, doc_count: 61 },
          { key_as_string: "2025-06-01", key: 1748736000000, doc_count: 39 },
        ],
      },
    },
    total_applications: {
      doc_count: 25925,
      applications: {
        buckets: [
          { key_as_string: "2024-07-01", key: 1719792000000, doc_count: 1847 },
          { key_as_string: "2024-08-01", key: 1722470400000, doc_count: 2309 },
          { key_as_string: "2024-09-01", key: 1725148800000, doc_count: 2264 },
          { key_as_string: "2024-10-01", key: 1727740800000, doc_count: 2574 },
          { key_as_string: "2024-11-01", key: 1730419200000, doc_count: 2545 },
          { key_as_string: "2024-12-01", key: 1733011200000, doc_count: 2245 },
          { key_as_string: "2025-01-01", key: 1735689600000, doc_count: 1958 },
          { key_as_string: "2025-02-01", key: 1738368000000, doc_count: 1392 },
          { key_as_string: "2025-03-01", key: 1740787200000, doc_count: 2188 },
          { key_as_string: "2025-04-01", key: 1743465600000, doc_count: 2689 },
          { key_as_string: "2025-05-01", key: 1746057600000, doc_count: 1903 },
          { key_as_string: "2025-06-01", key: 1748736000000, doc_count: 2011 },
        ],
      },
    },
    total_approvals: {
      doc_count: 535,
      applications: {
        buckets: [
          { key_as_string: "2024-07-01", key: 1719792000000, doc_count: 44 },
          { key_as_string: "2024-08-01", key: 1722470400000, doc_count: 18 },
          { key_as_string: "2024-09-01", key: 1725148800000, doc_count: 14 },
          { key_as_string: "2024-10-01", key: 1727740800000, doc_count: 20 },
          { key_as_string: "2024-11-01", key: 1730419200000, doc_count: 89 },
          { key_as_string: "2024-12-01", key: 1733011200000, doc_count: 29 },
          { key_as_string: "2025-01-01", key: 1735689600000, doc_count: 5 },
          { key_as_string: "2025-02-01", key: 1738368000000, doc_count: 24 },
          { key_as_string: "2025-03-01", key: 1740787200000, doc_count: 50 },
          { key_as_string: "2025-04-01", key: 1743465600000, doc_count: 154 },
          { key_as_string: "2025-05-01", key: 1746057600000, doc_count: 50 },
          { key_as_string: "2025-06-01", key: 1748736000000, doc_count: 38 },
        ],
      },
    },
    total_matched: {
      doc_count: 1006,
      applications: {
        buckets: [
          { key_as_string: "2024-07-01", key: 1719792000000, doc_count: 31 },
          { key_as_string: "2024-08-01", key: 1722470400000, doc_count: 43 },
          { key_as_string: "2024-09-01", key: 1725148800000, doc_count: 49 },
          { key_as_string: "2024-10-01", key: 1727740800000, doc_count: 68 },
          { key_as_string: "2024-11-01", key: 1730419200000, doc_count: 166 },
          { key_as_string: "2024-12-01", key: 1733011200000, doc_count: 57 },
          { key_as_string: "2025-01-01", key: 1735689600000, doc_count: 33 },
          { key_as_string: "2025-02-01", key: 1738368000000, doc_count: 43 },
          { key_as_string: "2025-03-01", key: 1740787200000, doc_count: 123 },
          { key_as_string: "2025-04-01", key: 1743465600000, doc_count: 244 },
          { key_as_string: "2025-05-01", key: 1746057600000, doc_count: 94 },
          { key_as_string: "2025-06-01", key: 1748736000000, doc_count: 55 },
        ],
      },
    },
    total_signup: {
      doc_count: 4381,
      people: {
        buckets: [
          { key_as_string: "2024-07-01", key: 1719792000000, doc_count: 120 },
          { key_as_string: "2024-08-01", key: 1722470400000, doc_count: 139 },
          { key_as_string: "2024-09-01", key: 1725148800000, doc_count: 257 },
          { key_as_string: "2024-10-01", key: 1727740800000, doc_count: 1270 },
          { key_as_string: "2024-11-01", key: 1730419200000, doc_count: 498 },
          { key_as_string: "2024-12-01", key: 1733011200000, doc_count: 103 },
          { key_as_string: "2025-01-01", key: 1735689600000, doc_count: 54 },
          { key_as_string: "2025-02-01", key: 1738368000000, doc_count: 449 },
          { key_as_string: "2025-03-01", key: 1740787200000, doc_count: 350 },
          { key_as_string: "2025-04-01", key: 1743465600000, doc_count: 753 },
          { key_as_string: "2025-05-01", key: 1746057600000, doc_count: 217 },
          { key_as_string: "2025-06-01", key: 1748736000000, doc_count: 171 },
        ],
      },
    },
  },
};

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

        {/* Metric Selector */}
        <MetricSelector
          selectedMetrics={selectedMetrics}
          onMetricsChange={setSelectedMetrics}
        />

        {/* Main Time Series Chart */}
        {chartData.length > 0 && selectedMetrics.length > 0 && (
          <div className="mb-6">
            <TimeSeriesChart
              data={chartData}
              selectedMetrics={selectedMetrics}
              title="Exchange Metrics Over Time"
            />
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
