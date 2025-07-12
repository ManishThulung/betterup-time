import {
  Activity,
  Bell,
  Globe,
  Smartphone,
  Clock,
  Shield,
  BarChart3,
  Zap,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Monitor your websites and APIs with checks every 30 seconds from multiple global locations.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description:
      "Get notified immediately via email, SMS, Slack, or webhook when your site goes down.",
  },
  {
    icon: Globe,
    title: "Global Monitoring",
    description:
      "Monitor from 15+ global locations to ensure your site is accessible worldwide.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Get comprehensive reports with response times, uptime statistics, and performance insights.",
  },
  {
    icon: Shield,
    title: "SSL Monitoring",
    description:
      "Monitor SSL certificates and get alerted before they expire to prevent security issues.",
  },
  {
    icon: Smartphone,
    title: "Status Pages",
    description:
      "Beautiful, customizable status pages to keep your customers informed during incidents.",
  },
  {
    icon: Clock,
    title: "Incident Timeline",
    description:
      "Track incident history with detailed timelines and resolution times for analysis.",
  },
  {
    icon: Zap,
    title: "API Monitoring",
    description:
      "Monitor REST APIs, GraphQL endpoints, and database connections with custom checks.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share monitoring data with your team and set up escalation rules for critical alerts.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {" "}
              Monitor{" "}
            </span>
            Your Infrastructure
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive monitoring tools to ensure your websites and services
            are always available
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card hover:bg-gradient-to-br hover:from-card hover:to-primary/5"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
