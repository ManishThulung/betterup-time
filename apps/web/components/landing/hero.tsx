import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react";
import { Button } from "@repo/web/components/ui/button";
// import heroDashboard from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse-glow"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                99.9% Uptime Guaranteed
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Monitor Your
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {" "}
                  Website{" "}
                </span>
                24/7
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Get instant alerts when your website goes down. Advanced
                monitoring with real-time notifications and detailed analytics
                to keep your business online.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg">
                Start Monitoring Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                View Live Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">30s</div>
                <div className="text-sm text-muted-foreground">
                  Check Interval
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Websites</div>
              </div>
            </div>
          </div>

          {/* Right content - Dashboard preview */}
          <div className="relative lg:ml-8 animate-scale-in">
            <div className="relative">
              <img
                src={"/hero-dashboard.jpg"}
                alt="Uptime monitoring dashboard"
                className="rounded-2xl shadow-card hover:shadow-glow transition-all duration-500 w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent rounded-2xl"></div>

              {/* Floating status indicators */}
              <div className="absolute bg-[#16A249] -top-4 -left-4 bg-success text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
                All Systems Online
              </div>

              <div className="absolute -bottom-4 -right-4 bg-card text-card-foreground px-4 py-2 rounded-lg shadow-card flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">99.98% Last 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
