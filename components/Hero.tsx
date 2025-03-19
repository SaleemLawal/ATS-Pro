"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { CheckCircle, FileText, Users } from "lucide-react";

export default function Hero() {
  const stats = [
    {
      icon: <FileText className="w-10 h-10 text-primary" />,
      title: "20+",
      description: "Resumes Analyzed",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-primary" />,
      title: "85%",
      description: "Higher Response Rate",
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "50+",
      description: "Job Roles Supported",
    },
  ];
  return (
    <div className="relative overflow-hidden pt-32 pb-20 min-h-screen md:pt-40 md:pb-28 ">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-transparent -z-10" />

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full animate-float blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* content */}
      <div className="container-tight relative z-10 md:mt-20">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center rounded-full px-4 py-1 border border-border bg-background/50 backdrop-blur-sm"
          >
            <span className="text-xs font-semibold text-foreground/80">
              AI-Powered Resume Analysis
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-1 mb-6 max-w-4xl"
          >
            Elevate your Resume with{" "}
            <span className="text-gradient">AI Insights</span>
          </motion.h1>

          {/* sub title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mb-10 subheading"
          >
            Get personalized feedback, keyword optimization, and
            industry-specific improvements to make your resume stand out to
            employers and ATS systems
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link href="/upload" className="btn-primary px-8 py-3">
              Analyze My Resume
            </Link>

            <Link href="/" className="btn-outline px-8 py-3">
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{stat.title}</h3>
                <p className="text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
