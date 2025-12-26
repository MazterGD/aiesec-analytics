import { format, parseISO } from "date-fns";
import {
  AnalyticsResponse,
  ChartDataPoint,
  AnalyticsInsight,
  TrendAnalysis,
  AnalyticsBucket,
} from "../types/analytics";
import { METRIC_CONFIGS } from "./constants";

export function transformAnalyticsData(
  data: AnalyticsResponse
): ChartDataPoint[] {
  const analytics = data.analytics;
  const dateMap = new Map<string, ChartDataPoint>();

  // Process each metric
  Object.entries(analytics).forEach(([metricKey, metricData]) => {
    if (!metricData) return;

    const buckets =
      metricData.applications?.buckets || metricData.people?.buckets || [];

    buckets.forEach((bucket: AnalyticsBucket) => {
      const dateKey = bucket.key_as_string;

      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, {
          date: dateKey,
          formattedDate: format(parseISO(dateKey), "MMM yyyy"),
        });
      }

      const dataPoint = dateMap.get(dateKey)!;
      dataPoint[metricKey] = bucket.doc_count;
    });
  });

  return Array.from(dateMap.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function calculateTrendAnalysis(
  data: ChartDataPoint[],
  metricKey: string
): TrendAnalysis | null {
  if (data.length < 2) return null;

  const values = data.map((d) => (d[metricKey] as number) || 0);
  const firstHalf = values.slice(0, Math.floor(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));

  const firstHalfAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondHalfAvg =
    secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

  const percentChange =
    firstHalfAvg === 0
      ? 0
      : ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;

  const trend =
    percentChange > 5
      ? "increasing"
      : percentChange < -5
      ? "decreasing"
      : "stable";

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const maxIndex = values.indexOf(maxValue);
  const minIndex = values.indexOf(minValue);

  return {
    metric: metricKey,
    trend,
    percentChange: Math.round(percentChange * 10) / 10,
    average: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
    max: { value: maxValue, date: data[maxIndex]?.formattedDate || "" },
    min: { value: minValue, date: data[minIndex]?.formattedDate || "" },
  };
}

export function generateInsights(
  data: ChartDataPoint[],
  analytics: AnalyticsResponse
): AnalyticsInsight[] {
  const insights: AnalyticsInsight[] = [];

  if (data.length < 2) return insights;

  // Conversion Rate Insight
  const totalApps = analytics.analytics.total_applications?.doc_count || 0;
  const totalRealized = analytics.analytics.total_realized?.doc_count || 0;
  const conversionRate = totalApps > 0 ? (totalRealized / totalApps) * 100 : 0;

  insights.push({
    type: conversionRate > 1 ? "positive" : "warning",
    title: "Conversion Rate",
    description: `${conversionRate.toFixed(
      2
    )}% of applications convert to realized exchanges`,
    value: `${conversionRate.toFixed(2)}%`,
    equation: `(Realized ÷ Applications) × 100 = (${totalRealized.toLocaleString()} ÷ ${totalApps.toLocaleString()}) × 100`,
  });

  // Completion Rate
  const totalFinished = analytics.analytics.total_finished?.doc_count || 0;
  const completionRate =
    totalRealized > 0 ? (totalFinished / totalRealized) * 100 : 0;

  insights.push({
    type:
      completionRate > 70
        ? "positive"
        : completionRate > 50
        ? "neutral"
        : "negative",
    title: "Completion Rate",
    description: `${completionRate.toFixed(
      1
    )}% of realized exchanges are finished`,
    value: `${completionRate.toFixed(1)}%`,
    equation: `(Finished ÷ Realized) × 100 = (${totalFinished.toLocaleString()} ÷ ${totalRealized.toLocaleString()}) × 100`,
  });

  // Match Rate
  const totalMatched = analytics.analytics.total_matched?.doc_count || 0;
  const matchRate = totalApps > 0 ? (totalMatched / totalApps) * 100 : 0;

  insights.push({
    type: matchRate > 5 ? "positive" : "neutral",
    title: "Match Rate",
    description: `${matchRate.toFixed(2)}% of applications get matched`,
    value: `${matchRate.toFixed(2)}%`,
    equation: `(Matched ÷ Applications) × 100 = (${totalMatched.toLocaleString()} ÷ ${totalApps.toLocaleString()}) × 100`,
  });

  // Trend Analysis for Applications
  const appsTrend = calculateTrendAnalysis(data, "total_applications");
  if (appsTrend) {
    insights.push({
      type:
        appsTrend.trend === "increasing"
          ? "positive"
          : appsTrend.trend === "decreasing"
          ? "warning"
          : "neutral",
      title: "Applications Trend",
      description: `Applications are ${appsTrend.trend} with ${Math.abs(
        appsTrend.percentChange
      )}% change`,
      change: appsTrend.percentChange,
      equation: `Trend % = ((Recent Avg - Previous Avg) ÷ Previous Avg) × 100`,
    });
  }

  // Peak Performance
  const realizedTrend = calculateTrendAnalysis(data, "total_realized");
  if (realizedTrend) {
    insights.push({
      type: "neutral",
      title: "Peak Performance",
      description: `Highest realized exchanges (${realizedTrend.max.value}) occurred in ${realizedTrend.max.date}`,
      value: realizedTrend.max.value,
      equation: `Maximum value from time series data`,
    });
  }

  // Funnel Efficiency
  const approvals = analytics.analytics.total_approvals?.doc_count || 0;
  const anAccepted = analytics.analytics.total_an_accepted?.doc_count || 0;
  const approvalToRealizationRate =
    approvals > 0 ? (totalRealized / approvals) * 100 : 0;

  insights.push({
    type: approvalToRealizationRate > 40 ? "positive" : "warning",
    title: "Approval to Realization",
    description: `${approvalToRealizationRate.toFixed(
      1
    )}% of approvals convert to realizations`,
    value: `${approvalToRealizationRate.toFixed(1)}%`,
    equation: `(Realized ÷ Approvals) × 100 = (${totalRealized.toLocaleString()} ÷ ${approvals.toLocaleString()}) × 100`,
  });

  // Sign-up to Application ratio
  const signups = analytics.analytics.total_signup?.doc_count || 0;
  const signupToAppRatio = signups > 0 ? totalApps / signups : 0;

  insights.push({
    type: signupToAppRatio > 5 ? "positive" : "neutral",
    title: "Engagement Rate",
    description: `Each sign-up generates an average of ${signupToAppRatio.toFixed(
      1
    )} applications`,
    value: signupToAppRatio.toFixed(1),
    equation: `Applications ÷ Sign-ups = ${totalApps.toLocaleString()} ÷ ${signups.toLocaleString()}`,
  });

  return insights;
}

export function calculateFunnelData(analytics: AnalyticsResponse) {
  return [
    {
      stage: "Sign-ups",
      value: analytics.analytics.total_signup?.doc_count || 0,
      color: "#6366f1",
    },
    {
      stage: "Matched",
      value: analytics.analytics.total_matched?.doc_count || 0,
      color: "#8b5cf6",
    },
    {
      stage: "Applications",
      value: analytics.analytics.total_applications?.doc_count || 0,
      color: "#3b82f6",
    },
    {
      stage: "Accepted by Host",
      value: analytics.analytics.total_an_accepted?.doc_count || 0,
      color: "#10b981",
    },
    {
      stage: "Approvals",
      value: analytics.analytics.total_approvals?.doc_count || 0,
      color: "#06b6d4",
    },
    {
      stage: "Realized",
      value: analytics.analytics.total_realized?.doc_count || 0,
      color: "#f59e0b",
    },
    {
      stage: "Finished",
      value: analytics.analytics.total_finished?.doc_count || 0,
      color: "#ef4444",
    },
    {
      stage: "Completed",
      value: analytics.analytics.total_completed?.doc_count || 0,
      color: "#22c55e",
    },
  ];
}

export function getMetricLabel(key: string): string {
  const config = METRIC_CONFIGS.find((m) => m.key === key);
  return config?.label || key.replace("total_", "").replace("_", " ");
}

export function getMetricColor(key: string): string {
  const config = METRIC_CONFIGS.find((m) => m.key === key);
  return config?.color || "#6b7280";
}
