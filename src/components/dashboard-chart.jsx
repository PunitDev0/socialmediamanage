"use client";
import { useEffect, useState } from "react"
import { Area, Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function DashboardChart({
  data,
  color = "#8b5cf6",
  showAxis = false,
  showTooltip = false,
  showLegend = false,
  areaChart = false,
  title
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-full w-full flex items-center justify-center">Loading chart...</div>;
  }

  // Determine if data has multiple metrics
  const hasMultipleMetrics = data.length > 0 && Object.keys(data[0]).filter((key) => key !== "name").length > 1

  // Get all metrics except 'name'
  const metrics = data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "name") : []

  // Generate colors for multiple metrics
  const colors = [
    "#8b5cf6", // Purple
    "#10b981", // Green
    "#3b82f6", // Blue
    "#f59e0b", // Amber
    "#ef4444", // Red
  ]

  return (
    (<div className="h-full w-full">
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showAxis && (
            <>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
            </>
          )}

          {showTooltip && <Tooltip />}
          {showLegend && hasMultipleMetrics && <Legend />}

          {hasMultipleMetrics ? (
            // Render multiple metrics
            (metrics.map((metric, index) =>
              areaChart ? (
                <Area
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  fill={colors[index % colors.length]}
                  stroke={colors[index % colors.length]}
                  fillOpacity={0.2}
                  activeDot={{ r: 6 }} />
              ) : (
                <Bar
                  key={metric}
                  dataKey={metric}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                  barSize={20} />
              )))
          ) : // Render single metric
          areaChart ? (
            <Area
              type="monotone"
              dataKey={metrics[0]}
              fill={color}
              stroke={color}
              fillOpacity={0.2}
              activeDot={{ r: 6 }} />
          ) : (
            <Bar dataKey={metrics[0]} fill={color} radius={[4, 4, 0, 0]} barSize={20} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>)
  );
}

