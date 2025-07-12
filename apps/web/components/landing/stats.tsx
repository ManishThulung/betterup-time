import { TrendingUp, Users, Globe, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Websites Monitored",
    description: "Trusted by developers worldwide",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Global Locations",
    description: "Monitoring from every continent",
  },
  {
    icon: Clock,
    value: "99.9%",
    label: "Uptime Guarantee",
    description: "Industry-leading reliability",
  },
  {
    icon: TrendingUp,
    value: "30s",
    label: "Check Frequency",
    description: "Real-time monitoring",
  },
];

export const Stats = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trusted by Thousands of
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {" "}
              Businesses{" "}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join the community of developers who rely on us to keep their
            services online
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>

                <div className="text-lg font-semibold mb-1">{stat.label}</div>

                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
