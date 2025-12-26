import { AnalyticsResponse, MetricConfig } from "../types/analytics";

export const METRIC_CONFIGS: MetricConfig[] = [
  {
    key: "total_signup",
    label: "Sign-ups",
    color: "#6366f1",
    description: "Total number of new sign-ups",
  },
  {
    key: "total_matched",
    label: "Matched",
    color: "#8b5cf6",
    description: "Applications that have been matched with opportunities",
  },
  {
    key: "total_applications",
    label: "Applications",
    color: "#3b82f6",
    description: "Total number of applications submitted",
  },
  {
    key: "total_an_accepted",
    label: "Accepted by Host",
    color: "#10b981",
    description: "Applications accepted by host organization",
  },
  {
    key: "total_approvals",
    label: "Approvals",
    color: "#06b6d4",
    description: "Applications that have been approved",
  },
  {
    key: "total_realized",
    label: "Realized",
    color: "#f59e0b",
    description: "Exchanges that have been realized (started)",
  },
  {
    key: "total_finished",
    label: "Finished",
    color: "#ef4444",
    description: "Exchanges that have been finished",
  },
  {
    key: "total_completed",
    label: "Completed",
    color: "#22c55e",
    description: "Exchanges that have been completed successfully",
  },
  {
    key: "total_remote_realized",
    label: "Remote Realized",
    color: "#ec4899",
    description: "Remote exchanges that have been realized",
  },
];

// Demo data for initial display
export const DEMO_DATA: AnalyticsResponse = {
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

export const INTERVAL_OPTIONS = [
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
  { value: "quarter", label: "Quarterly" },
  { value: "year", label: "Yearly" },
];

export const API_BASE_URL =
  "https://analytics.api.aiesec.org/v2/applications/analyze.json";
