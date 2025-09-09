import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Baby, 
  Users, 
  DollarSign, 
  Stethoscope, 
  Brain,
  ArrowRight 
} from "lucide-react";

const categories = [
  {
    title: "Women's Health",
    description: "Maternal mortality, reproductive health, prenatal care indicators",
    icon: Heart,
    color: "text-chart-1",
    stats: "45 indicators",
  },
  {
    title: "Children's Health", 
    description: "Infant mortality, vaccination rates, child development metrics",
    icon: Baby,
    color: "text-chart-2",
    stats: "38 indicators",
  },
  {
    title: "Senior Health",
    description: "Chronic disease management, elderly care, quality of life metrics",
    icon: Users,
    color: "text-chart-3",
    stats: "52 indicators",
  },
  {
    title: "Financing",
    description: "Healthcare costs, budget allocation, cost-effectiveness analysis",
    icon: DollarSign,
    color: "text-chart-4",
    stats: "29 indicators",
  },
  {
    title: "Primary Care",
    description: "Access to care, preventive services, primary care utilization",
    icon: Stethoscope,
    color: "text-chart-5",
    stats: "41 indicators",
  },
  {
    title: "Mental Health",
    description: "Mental health services, suicide rates, psychological wellbeing",
    icon: Brain,
    color: "text-chart-1",
    stats: "33 indicators",
  },
];

export const DashboardCategories = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Health Dashboard Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Organize and analyze health data across key areas of public health management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-elevated transition-all duration-300 border-0 shadow-card group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      {category.stats}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View Dashboard
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};