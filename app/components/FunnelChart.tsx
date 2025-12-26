"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface FunnelChartProps {
  data: {
    stage: string;
    value: number;
    color: string;
  }[];
}

export default function FunnelChart({ data }: FunnelChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage =
        maxValue > 0 ? ((item.value / maxValue) * 100).toFixed(1) : 0;

      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900 dark:text-white">
            {item.stage}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Count:{" "}
            <span className="font-medium">{item.value.toLocaleString()}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ratio: <span className="font-medium">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Exchange Funnel
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 80, left: 80, bottom: 5 }}
          >
            <XAxis
              type="number"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis
              type="category"
              dataKey="stage"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(value) =>
                  typeof value === "number"
                    ? value.toLocaleString()
                    : String(value)
                }
                style={{ fill: "#6b7280", fontSize: 12 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion rates */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.slice(1).map((item, index) => {
          const prevValue = data[index].value;
          const convRate =
            prevValue > 0 ? ((item.value / prevValue) * 100).toFixed(1) : 0;

          return (
            <div
              key={item.stage}
              className="text-center p-2 rounded-lg"
              style={{ backgroundColor: `${item.color}10` }}
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {data[index].stage} → {item.stage}
              </p>
              <p
                className="text-lg font-semibold"
                style={{ color: item.color }}
              >
                {convRate}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
