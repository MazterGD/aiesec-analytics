"use client";

import { useState } from "react";

interface ConversionRatesProps {
  data: {
    stage: string;
    value: number;
    color: string;
  }[];
}

export default function ConversionRates({ data }: ConversionRatesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="rounded-3xl p-6 bg-white"
      style={{
        border: "1px solid #e8e4df",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
      }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Stage Conversion Rates
      </h3>

      <div className="flex flex-wrap gap-3">
        {data.slice(1).map((item, index) => {
          const prevValue = data[index].value;
          const convRate =
            prevValue > 0 ? ((item.value / prevValue) * 100).toFixed(1) : 0;

          return (
            <div
              key={item.stage}
              className="relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              style={{
                backgroundColor: `${item.color}10`,
                border: `1px solid ${item.color}30`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="font-medium">{data[index].stage}</span>
                <span style={{ color: item.color }}>→</span>
                <span className="font-medium">{item.stage}</span>
              </div>
              <div
                className="text-lg font-bold px-2 py-0.5 rounded-lg"
                style={{
                  color: item.color,
                  backgroundColor: `${item.color}20`,
                }}
              >
                {convRate}%
              </div>

              {/* Hover tooltip showing equation */}
              {hoveredIndex === index && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                  <div className="text-gray-300">
                    <span className="text-white font-medium">{item.stage}</span>{" "}
                    ÷{" "}
                    <span className="text-white font-medium">
                      {data[index].stage}
                    </span>{" "}
                    × 100
                  </div>
                  <div className="text-gray-400 mt-1">
                    = ({item.value.toLocaleString()} ÷{" "}
                    {prevValue.toLocaleString()}) × 100 = {convRate}%
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
