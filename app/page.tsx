"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Clock, Share2, Cloud, Lock, Upload } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Sharing",
    description: "Your files are encrypted and protected with enterprise-grade security"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Upload and share files instantly with optimized transfer speeds"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "File Retention",
    description: "Keep your files accessible for as long as you need them"
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Easy Sharing",
    description: "Share files with anyone using simple, shareable links"
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Storage",
    description: "Access your files from anywhere, anytime with cloud storage"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Privacy First",
    description: "Your privacy is our priority with end-to-end encryption"
  }
];

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-10 pb-20">
        <div className="container mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
            Share Files with <span className="text-primary">Confidence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The secure, fast, and free way to share your files with anyone. Protected with end-to-end encryption.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/upload">
              <Button size="lg" className="gap-2">
                Start Uploading <Upload className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/files">
              <Button size="lg" variant="outline">
                View Files
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Why Choose FileShare?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the best-in-class file sharing platform with features designed for security and ease of use.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Encryption Section */}
      <section className="container mx-auto">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 md:p-12 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">End-to-End Encryption</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your files are automatically encrypted the moment they leave your device, ensuring maximum security throughout the entire transfer process.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>AES-256 encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Zero-knowledge security</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Secure key management</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/upload">
                  <Button className="gap-2">
                    Try It Now <Upload className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-primary/10 p-8 md:p-12 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl" />
                <div className="absolute inset-4 bg-card rounded-xl shadow-lg flex items-center justify-center">
                  <Lock className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto">
        <Card className="p-12 text-center space-y-6 bg-primary text-primary-foreground">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Join thousands of users who trust FileShare for their secure file sharing needs. It's completely free and protected with end-to-end encryption.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/upload">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Sharing Now <Upload className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
