import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Sparkles, TrendingUp, Calendar } from "lucide-react";

export const AISearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate AI search
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const sampleQueries = [
    "Create a time series graph showing infant mortality and maternal mortality between 2018 and 2024",
    "Compare vaccination rates across different age groups",
    "Show correlation between healthcare financing and patient outcomes",
    "Generate senior health dashboard for last 5 years"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-light text-accent font-medium px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Analytics
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ask AI to Build Your Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Use natural language to search across health indicators and create custom visualizations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-elevated border-0">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Ask AI to create dashboards, charts, or analyze health data..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 h-14 text-lg"
                  />
                </div>
                <Button 
                  size="lg"
                  variant="professional"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Sample queries:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sampleQueries.map((sample, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(sample)}
                      className="text-left p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm text-muted-foreground hover:text-foreground"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Mock Results */}
          {isSearching && (
            <Card className="mt-6 p-6 shadow-card">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span className="font-medium">AI is analyzing health data...</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <TrendingUp className="h-5 w-5 text-chart-1" />
                    <div>
                      <div className="text-sm font-medium">Found 15 indicators</div>
                      <div className="text-xs text-muted-foreground">Across 3 categories</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-chart-2" />
                    <div>
                      <div className="text-sm font-medium">2018-2024 data</div>
                      <div className="text-xs text-muted-foreground">7 years coverage</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Search className="h-5 w-5 text-chart-3" />
                    <div>
                      <div className="text-sm font-medium">Creating charts</div>
                      <div className="text-xs text-muted-foreground">Time series & trends</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};