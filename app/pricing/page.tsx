"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal use",
    features: [
      "2 GB Storage",
      "Max file size: 100 MB",
      "Basic file sharing",
      "7 days file retention",
      "Community support"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "month",
    description: "Ideal for professionals",
    features: [
      "50 GB Storage",
      "Max file size: 2 GB",
      "Advanced file sharing",
      "30 days file retention",
      "Priority support",
      "Download statistics",
      "Custom branding"
    ],
    buttonText: "Start Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$29.99",
    period: "month",
    description: "For large teams & organizations",
    features: [
      "500 GB Storage",
      "Max file size: 10 GB",
      "Team collaboration",
      "90 days file retention",
      "24/7 Priority support",
      "Advanced analytics",
      "Custom integration",
      "SLA guarantee"
    ],
    buttonText: "Contact Sales",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include unlimited file sharing and basic features.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {tiers.map((tier) => (
          <Card 
            key={tier.name} 
            className={`p-6 flex flex-col ${
              tier.popular ? 'border-primary shadow-lg scale-105' : ''
            }`}
          >
            {tier.popular && (
              <div className="text-primary text-sm font-medium mb-2">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold">{tier.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">{tier.price}</span>
              {tier.period && (
                <span className="text-muted-foreground">/{tier.period}</span>
              )}
            </div>
            <p className="text-muted-foreground mt-2">{tier.description}</p>
            
            <div className="mt-6 space-y-4 flex-1">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              className="mt-8 w-full"
              variant={tier.popular ? "default" : "outline"}
            >
              {tier.buttonText}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center text-muted-foreground mt-12">
        <p>All prices are in USD. Need a custom plan? <span className="text-primary cursor-pointer">Contact us</span></p>
      </div>
    </div>
  );
} 