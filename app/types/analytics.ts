// Types for AIESEC Analytics API

export interface AnalyticsBucket {
  key_as_string: string;
  key: number;
  doc_count: number;
}

export interface AnalyticsMetric {
  doc_count: number;
  applications?: {
    buckets: AnalyticsBucket[];
  };
  people?: {
    buckets: AnalyticsBucket[];
  };
}

export interface AnalyticsResponse {
  analytics: {
    total_remote_realized?: AnalyticsMetric;
    total_completed?: AnalyticsMetric;
    total_finished?: AnalyticsMetric;
    total_realized?: AnalyticsMetric;
    total_an_accepted?: AnalyticsMetric;
    total_applications?: AnalyticsMetric;
    total_approvals?: AnalyticsMetric;
    total_matched?: AnalyticsMetric;
    total_signup?: AnalyticsMetric;
  };
}

export interface ChartDataPoint {
  date: string;
  formattedDate: string;
  [key: string]: string | number;
}

export interface MetricConfig {
  key: string;
  label: string;
  color: string;
  description: string;
}

export interface FilterParams {
  startDate: string;
  endDate: string;
  interval: "day" | "week" | "month" | "quarter" | "year";
}

export interface AnalyticsInsight {
  type: "positive" | "negative" | "neutral" | "warning";
  title: string;
  description: string;
  value?: string | number;
  change?: number;
}

export interface TrendAnalysis {
  metric: string;
  trend: "increasing" | "decreasing" | "stable";
  percentChange: number;
  average: number;
  max: { value: number; date: string };
  min: { value: number; date: string };
}
