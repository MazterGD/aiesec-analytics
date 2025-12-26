import { MetricConfig } from "../types/analytics";

export const METRIC_CONFIGS: MetricConfig[] = [
  {
    key: "total_applications",
    label: "Applications",
    color: "#3b82f6",
    description: "Total number of applications submitted",
  },
  {
    key: "total_matched",
    label: "Matched",
    color: "#8b5cf6",
    description: "Applications that have been matched with opportunities",
  },
  {
    key: "total_approvals",
    label: "Approvals",
    color: "#06b6d4",
    description: "Applications that have been approved",
  },
  {
    key: "total_an_accepted",
    label: "AN Accepted",
    color: "#10b981",
    description: "Applications accepted by AN (Acceptance Note)",
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
  {
    key: "total_signup",
    label: "Sign-ups",
    color: "#6366f1",
    description: "Total number of new sign-ups",
  },
];

export const INTERVAL_OPTIONS = [
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
  { value: "quarter", label: "Quarterly" },
  { value: "year", label: "Yearly" },
];

export const API_BASE_URL =
  "https://analytics.api.aiesec.org/v2/applications/analyze.json";
