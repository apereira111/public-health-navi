import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Heart } from "lucide-react";

const mockData = {
  maternalMortality: {
    current: 23.8,
    change: -12.5,
    trend: "down"
  },
  infantMortality: {
    current: 5.8,
    change: -8.2,
    trend: "down"
  },
  prenatalCare: {
    current: 89.2,
    change: 5.1,
    trend: "up"
  },
  vaccination: {
    current: 94.5,
    change: 2.3,
    trend: "up"
  }
};

export const SampleDashboard = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Live Dashboard Preview
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Women's Health Dashboard
          </h2>
          <p className="text-xl text-muted-foreground">
            Real-time health indicators and trends for maternal and reproductive health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 shadow-card border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-destructive" />
              </div>
              <Badge variant={mockData.maternalMortality.trend === "down" ? "secondary" : "destructive"}>
                {mockData.maternalMortality.change > 0 ? "+" : ""}{mockData.maternalMortality.change}%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Maternal Mortality Rate</p>
              <p className="text-2xl font-bold text-foreground">
                {mockData.maternalMortality.current}
                <span className="text-sm text-muted-foreground ml-1">per 100k</span>
              </p>
            </div>
          </Card>

          <Card className="p-6 shadow-card border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-chart-2" />
              </div>
              <Badge variant="secondary">
                {mockData.infantMortality.change > 0 ? "+" : ""}{mockData.infantMortality.change}%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Infant Mortality Rate</p>
              <p className="text-2xl font-bold text-foreground">
                {mockData.infantMortality.current}
                <span className="text-sm text-muted-foreground ml-1">per 1k</span>
              </p>
            </div>
          </Card>

          <Card className="p-6 shadow-card border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-chart-1/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-1" />
              </div>
              <Badge variant="secondary">
                +{mockData.prenatalCare.change}%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Prenatal Care Coverage</p>
              <p className="text-2xl font-bold text-foreground">
                {mockData.prenatalCare.current}%
              </p>
            </div>
          </Card>

          <Card className="p-6 shadow-card border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-chart-3" />
              </div>
              <Badge variant="secondary">
                +{mockData.vaccination.change}%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Vaccination Rate</p>
              <p className="text-2xl font-bold text-foreground">
                {mockData.vaccination.current}%
              </p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 shadow-elevated border-0">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Mortality Trends (2018-2024)
              </h3>
              <p className="text-sm text-muted-foreground">
                Year-over-year changes in key mortality indicators
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                  <span className="text-sm font-medium">Maternal Mortality</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">-12.5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                  <span className="text-sm font-medium">Infant Mortality</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">-8.2%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-elevated border-0">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Care Access Improvements
              </h3>
              <p className="text-sm text-muted-foreground">
                Positive trends in healthcare accessibility
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                  <span className="text-sm font-medium">Prenatal Care</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">+5.1%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                  <span className="text-sm font-medium">Vaccination Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">+2.3%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};