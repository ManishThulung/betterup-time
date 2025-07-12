import { Button } from "@repo/web/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for personal projects and small websites",
    features: [
      "5 website monitors",
      "10-minute checks",
      "Email notifications",
      "30-day data retention",
      "Basic status page",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Ideal for growing businesses and development teams",
    features: [
      "50 website monitors",
      "1-minute checks",
      "Email, SMS & Slack alerts",
      "1-year data retention",
      "Custom status pages",
      "API monitoring",
      "SSL monitoring",
      "Team collaboration",
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "hero" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For large organizations with advanced monitoring needs",
    features: [
      "Unlimited monitors",
      "30-second checks",
      "All notification channels",
      "Unlimited data retention",
      "White-label status pages",
      "Advanced API monitoring",
      "Custom integrations",
      "Priority support",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Simple, Transparent
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {" "}
              Pricing{" "}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core
            monitoring features.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary bg-card shadow-glow"
                  : "border-border bg-card hover:border-primary/20 hover:shadow-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant={plan.buttonVariant} size="lg" className="w-full">
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};
