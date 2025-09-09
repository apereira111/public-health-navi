import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EvilBarChart, EvilLineChart, EvilPieChart } from "@/components/ui/evil-charts";
import { TrendingUp, TrendingDown, Activity, BarChart3, LineChart, PieChart } from "lucide-react";
import { ReportGenerator } from "@/components/ReportGenerator";
import type { PanelData } from "@/types";

interface DashboardPanelProps {
  data: PanelData;
}

const getChartIcon = (type: string) => {
  switch (type) {
    case 'bar':
      return <BarChart3 className="h-5 w-5 text-primary" />;
    case 'line':
      return <LineChart className="h-5 w-5 text-primary" />;
    case 'pie':
      return <PieChart className="h-5 w-5 text-primary" />;
    default:
      return <Activity className="h-5 w-5 text-primary" />;
  }
};

export const DashboardPanel = ({ data }: DashboardPanelProps) => {
  const renderChart = (chart: PanelData['charts'][0]) => {
    switch (chart.type) {
      case 'bar':
        return (
          <EvilBarChart 
            data={chart.data} 
            dataKey={chart.dataKey} 
            nameKey={chart.nameKey}
            className="animate-fade-in"
          />
        );
      
      case 'line':
        return (
          <EvilLineChart 
            data={chart.data} 
            dataKey={chart.dataKey} 
            nameKey={chart.nameKey}
            className="animate-fade-in"
          />
        );
      
      case 'pie':
        return (
          <EvilPieChart 
            data={chart.data} 
            dataKey={chart.dataKey} 
            nameKey={chart.nameKey}
            className="animate-fade-in"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <Badge variant="secondary" className="mb-4 animate-scale-in">
          <Activity className="h-4 w-4 mr-2" />
          Dashboard Ativo
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 animate-fade-in">
          {data.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-6 animate-fade-in">
          {data.description}
        </p>
        <div className="flex justify-center animate-fade-in">
          <ReportGenerator panelData={data} />
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.kpis.map((kpi, index) => (
          <Card 
            key={kpi.id} 
            className="p-6 shadow-card border-0 hover:shadow-elevated transition-all duration-300 hover-scale animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/20">
                {kpi.changeType === 'increase' ? (
                  <TrendingUp className="h-5 w-5 text-primary" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>
              <Badge 
                variant={kpi.changeType === 'increase' ? "secondary" : "destructive"}
                className="animate-scale-in"
              >
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
          <Card 
            key={index} 
            className="p-6 shadow-elevated border-0 hover:shadow-card transition-all duration-300 hover-scale animate-fade-in"
            style={{ animationDelay: `${(data.kpis.length + index) * 0.1}s` }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                {getChartIcon(chart.type)}
                <h3 className="text-lg font-semibold text-foreground">
                  {chart.title}
                </h3>
              </div>
            </div>
            {renderChart(chart)}
          </Card>
        ))}
      </div>
    </div>
  );
};