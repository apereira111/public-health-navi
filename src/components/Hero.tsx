import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transform Public Health
                <span className="block text-accent">Data Into Action</span>
              </h1>
              <p className="text-xl text-primary-glow leading-relaxed">
                Empower health managers with intelligent dashboards, AI-powered analytics, 
                and automated reporting for better health outcomes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Building Dashboards
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary-glow text-primary-glow hover:bg-primary-glow hover:text-primary">
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="bg-primary-glow/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-primary-glow">Health Categories</div>
              </div>
              <div className="text-center">
                <div className="bg-primary-glow/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-primary-glow">Health Indicators</div>
              </div>
              <div className="text-center">
                <div className="bg-primary-glow/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-primary-glow">Health Managers</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary/30 rounded-2xl blur-xl"></div>
            <img 
              src={heroImage} 
              alt="Healthcare dashboard interface showing data visualization and health indicators"
              className="relative rounded-2xl shadow-elevated w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};