import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { PanelData } from "@/types";

interface DashboardPanelProps {
  data: PanelData;
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export const DashboardPanel = ({ data }: DashboardPanelProps) => {
  const renderChart = (chart: PanelData['charts'][0]) => {
    const config = {
      [chart.dataKey]: {
        label: chart.title,
        color: "hsl(var(--chart-1))",
      },
    };

    switch (chart.type) {
      case 'bar':
        return (
          <ChartContainer config={config} className="min-h-[200px]">
            <BarChart data={chart.data}>
              <XAxis dataKey={chart.nameKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey={chart.dataKey} fill="hsl(var(--chart-1))" radius={4} />
            </BarChart>
          </ChartContainer>
        );
      
      case 'line':
        return (
          <ChartContainer config={config} className="min-h-[200px]">
            <LineChart data={chart.data}>
              <XAxis dataKey={chart.nameKey} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey={chart.dataKey} 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        );
      
      case 'pie':
        return (
          <ChartContainer config={config} className="min-h-[200px]">
            <PieChart>
              <Pie
                data={chart.data}
                dataKey={chart.dataKey}
                nameKey={chart.nameKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {chart.data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          Dashboard Ativo
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          {data.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {data.description}
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.kpis.map((kpi) => (
          <Card key={kpi.id} className="p-6 shadow-card border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                {kpi.changeType === 'increase' ? (
                  <TrendingUp className="h-5 w-5 text-primary" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>
              <Badge variant={kpi.changeType === 'increase' ? "secondary" : "destructive"}>
                {kpi.change}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{kpi.title}</p>
              <p className="text-2xl font-bold text-foreground">
                {kpi.value}
              </p>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.charts.map((chart, index) => (
          <Card key={index} className="p-6 shadow-elevated border-0">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {chart.title}
              </h3>
            </div>
            {renderChart(chart)}
          </Card>
        ))}
      </div>
    </div>
  );
};