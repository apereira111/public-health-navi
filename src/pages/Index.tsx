import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { DashboardCategories } from "@/components/DashboardCategories";
import { SampleDashboard } from "@/components/SampleDashboard";
import { AISearch } from "@/components/AISearch";
import { Reports } from "@/components/Reports";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <DashboardCategories />
      <SampleDashboard />
      <AISearch />
      <Reports />
    </div>
  );
};

export default Index;
