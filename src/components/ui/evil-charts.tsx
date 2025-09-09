import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface ChartData {
  name: string;
  value: number;
}

interface BaseChartProps {
  data: ChartData[];
  className?: string;
  title?: string;
  dataKey?: string;
  nameKey?: string;
}

// Animated Bar Chart
export const EvilBarChart = ({ 
  data, 
  className = "", 
  dataKey = "value", 
  nameKey = "name" 
}: BaseChartProps) => {
  const config = {
    [dataKey]: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className={`w-full h-[300px] ${className}`}>
      <ChartContainer config={config} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis 
              dataKey={nameKey}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            />
            <Bar 
              dataKey={dataKey} 
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
              className="animate-fade-in"
              style={{
                filter: "drop-shadow(0 4px 8px hsl(var(--primary) / 0.3))",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

// Animated Line Chart
export const EvilLineChart = ({ 
  data, 
  className = "", 
  dataKey = "value", 
  nameKey = "name" 
}: BaseChartProps) => {
  const config = {
    [dataKey]: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className={`w-full h-[300px] ${className}`}>
      <ChartContainer config={config} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis 
              dataKey={nameKey}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{
                fill: "hsl(var(--primary))",
                strokeWidth: 2,
                stroke: "hsl(var(--background))",
                r: 6,
              }}
              activeDot={{
                r: 8,
                fill: "hsl(var(--primary))",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
              className="animate-fade-in"
              style={{
                filter: "drop-shadow(0 2px 4px hsl(var(--primary) / 0.3))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

// Animated Pie Chart
export const EvilPieChart = ({ 
  data, 
  className = "", 
  dataKey = "value", 
  nameKey = "name" 
}: BaseChartProps) => {
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const config = {
    [dataKey]: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className={`w-full h-[300px] ${className}`}>
      <ChartContainer config={config} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey={dataKey}
              nameKey={nameKey}
              className="animate-scale-in"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
              }}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
                color: "hsl(var(--muted-foreground))",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

// Animated Area Chart
export const EvilAreaChart = ({ 
  data, 
  className = "", 
  dataKey = "value", 
  nameKey = "name" 
}: BaseChartProps) => {
  const config = {
    [dataKey]: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className={`w-full h-[300px] ${className}`}>
      <ChartContainer config={config} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey={nameKey}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            />
            <Bar 
              dataKey={dataKey} 
              fill="url(#colorGradient)"
              radius={[4, 4, 0, 0]}
              className="animate-fade-in"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};