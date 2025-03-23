import React from "react";
import { MotionDiv, MotionH2, MotionP } from "./use-client";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "The keyword analysis feature helped me optimize my resume for each job application. I started getting more callbacks immediately.",
      author: "Sarah K.",
      role: "Product Manager",
    },
    {
      quote:
        "I was struggling to highlight my achievements effectively. The AI suggestions transformed my resume from good to exceptional.",
      author: "Michael T.",
      role: "Software Engineer",
    },
    {
      quote:
        "As a career changer, I wasn't sure how to position my experience. This tool helped me reframe my skills for my target industry.",
      author: "Jennifer L.",
      role: "Marketing Director",
    },
  ];
  return (
    <section className="py-20">
      <div className="container-tight">
        <div className="mb-16 text-center">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 heading-2"
          >
            Trusted by Job Seekers Worldwide
          </MotionH2>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto subheading"
          >
            See how our AI-powered resume analysis has helped proffessionals
            land their dream jobs
          </MotionP>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => {
            return (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 glass-card card-hover"
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-4xl text-yellow-400">
                      *
                    </span>
                  ))}
                </div>
                <p className="mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
