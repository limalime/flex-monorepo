"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { performanceData } from "@/lib/mock/chart";

export function PerformanceChart() {
  return (
    <div
      className="
        rounded-3xl
        border border-indigo-800/20
        p-6
      "
    >
      <h3 className="mb-6 text-xl font-semibold">
        Agent Growth
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={performanceData}>
            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="nemotron"
              stroke="#6366f1"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="opus"
              stroke="#06b6d4"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="gemini"
              stroke="#8b5cf6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}