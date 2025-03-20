"use client";
import { Feature } from "@/lib/types";
import {
  BarChart3,
  FileSearch,
  Lightbulb,
  Link,
  PenTool,
  Target,
} from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function Features() {
  const features: Feature[] = [
    {
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI analyzes your resume for strengths, weaknesses, and missed opportunities.",
      icon: <FileSearch className="w-10 h-10 text-primary" />,
    },
    {
      title: "Keyword Optimization",
      description:
        "Match your resume to specific job descriptions by adding the right keywords that ATS systems look for.",
      icon: <Target className="w-10 h-10 text-primary" />,
    },
    {
      title: "Improvement Suggestions",
      description:
        "Receive tailored suggestions to improve weak sections and highlight your achievements more effectively.",
      icon: <Lightbulb className="w-10 h-10 text-primary" />,
    },
    {
      title: "Content Enhancement",
      description:
        "Get AI-powered rewrites for bullet points that showcase your experience more impressively.",
      icon: <PenTool className="w-10 h-10 text-primary" />,
    },
    {
      title: "Resume Score",
      description:
        "See how your resume ranks against industry standards with our comprehensive scoring system.",
      icon: <BarChart3 className="w-10 h-10 text-primary" />,
    },
    {
      title: "Job Role Matching",
      description:
        "Understand how well your resume matches specific job roles and what you need to improve.",
      icon: <Link className="w-10 h-10 text-primary" />,
    },
  ];
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container-tight">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 heading-2"
          >
            Unlock the Power of AI for your Resume
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto subheading"
          >
            Our platform uses advanced AI to analyze your resume and provide
            actionable insights to help you land your dream job.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "glass-card p-8 card-hover flex flex-col items-start"
              )}
            >
              <div className="p-3 mb-4 rounded-lg bg-accent">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
