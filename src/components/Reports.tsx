import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Sparkles, Calendar, TrendingUp } from "lucide-react";

const reportTemplates = [
  {
    title: "Monthly Health Summary",
    description: "Comprehensive overview of key health indicators with trend analysis",
    type: "Executive Summary",
    frequency: "Monthly",
    icon: Calendar,
  },
  {
    title: "Maternal Health Report",
    description: "Detailed analysis of maternal mortality, prenatal care, and birth outcomes",
    type: "Specialized Report",
    frequency: "Quarterly",
    icon: FileText,
  },
  {
    title: "Disease Surveillance Report",
    description: "Real-time tracking of infectious diseases and outbreak patterns",
    type: "Surveillance",
    frequency: "Weekly",
    icon: TrendingUp,
  },
];

export const Reports = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-light text-accent font-medium px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Generated Reports
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Automated Report Generation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Generate professional health reports with AI analysis, insights, and recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {reportTemplates.map((template, index) => {
            const Icon = template.icon;
            return (
              <Card key={index} className="p-6 shadow-card border-0 hover:shadow-elevated transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {template.frequency}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {template.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Badge variant="outline" className="mb-4">
                      {template.type}
                    </Badge>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Sample Report Preview */}
        <Card className="p-8 shadow-elevated border-0 bg-gradient-subtle">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Sample AI-Generated Report
            </h3>
            <p className="text-muted-foreground">
              Preview of an automated monthly health summary
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-card">
            <div className="border-l-4 border-primary pl-6 mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Executive Summary - October 2024
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                This month's health data shows significant improvements in maternal health outcomes, 
                with a 12.5% reduction in maternal mortality rates compared to the same period last year. 
                Key factors contributing to this improvement include increased prenatal care coverage 
                and enhanced emergency obstetric services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="font-semibold text-foreground mb-3">Key Achievements</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Maternal mortality reduced by 12.5%
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Prenatal care coverage increased to 89.2%
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Vaccination rates improved by 2.3%
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-foreground mb-3">Recommendations</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Expand rural prenatal care programs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Increase emergency transport funding
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Enhance community health worker training
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};