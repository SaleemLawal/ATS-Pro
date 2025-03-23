import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionDiv, MotionH2, MotionP } from "./use-client";

export default function CTA() {
  return (
    <section className="py-20 bg-accent">
      <div className="container-tight">
        <div className="relative p-12 overflow-hidden glass-card">
          {/* Baclground elements */}
          <div className="absolute w-64 h-64 rounded-full -top-20 -right-20 bg-primary/5 blur-3xl" />
          <div className="absolute w-64 h-64 rounded-full -bottom-20 -left-20 bg-primary/10 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <MotionH2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 heading-2"
            >
              Ready to Upgrade Your Resume?
            </MotionH2>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 subheading"
            >
              Get instant AI-powered insights to make your resume stand out from
              the competition.
            </MotionP>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/upload"
                className="inline-flex items-center px-8 py-3 text-base btn-primary"
              >
                Analyze My Resume <ArrowRight className="ml-2" />
              </Link>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
