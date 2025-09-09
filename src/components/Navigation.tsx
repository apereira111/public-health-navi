import { Button } from "@/components/ui/button";
import { BarChart3, Search, FileText, Settings } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <BarChart3 className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                HealthDash
              </span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-8">
                <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">
                  Dashboards
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Reports
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Analytics
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="professional">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};