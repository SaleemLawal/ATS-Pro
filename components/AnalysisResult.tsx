"use client";
import { ResumeAnalysis } from "@/lib/types";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Download,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

export default function AnalysisResult({
  analysis,
}: {
  analysis: ResumeAnalysis;
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getBackgoundScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Score Overview */}
        <motion.div variants={item} className="p-8 glass-card">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="relative flex-shrink-0 w-32 h-32">
              <div className="relative flex items-center justify-center w-full h-full border-8 rounded-full border-secondary">
                <span
                  className={cn(
                    "text-3xl font-bold",
                    getScoreColor(analysis.score)
                  )}
                >
                  {analysis.score}
                </span>
              </div>
              <svg
                className="absolute inset-0"
                viewBox="0 0 100 100"
                width="100%"
                height="100%"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className={cn(
                    "text-secondary stroke-dasharray-[290] stroke-dashoffset-[290] transform -rotate-90 origin-center",
                    getScoreColor(analysis.score)
                  )}
                  style={{
                    strokeDashoffset: 290 - (290 * analysis.score) / 100,
                    transition: "stroke-dashoffset 1s ease-out",
                  }}
                />
              </svg>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold">Resume Score</h2>
              <p className="mb-4 text-muted-foreground">{analysis.summary}</p>

              <div className="flex flex-wrap gap-4">
                <Button className="btn-primary">
                  <Download className="w-4 h-4 mr-2" /> Download Report
                </Button>
                <Button variant="outline">
                  Improve My Resume <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs for analysis section */}
        <motion.div variants={item}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="justify-start w-full h-auto p-0 mb-6 border-b rounded-none">
              {["overview", "suggestions", "keywords", "sections"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-none border-b-2! border-transparent! py-3 px-4 data-[state=active]:border-b-primary! data-[state=active]:bg-transparent!"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                )
              )}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Strengths and Weaknesses */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="flex items-center mb-4 text-lg font-semibold">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Strengths
                    </h3>

                    <ul className="space-y-3">
                      {analysis.strengths.map((strength, i) => (
                        <li key={i} className="flex items-start">
                          <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1 mr-2 rounded-full bg-green-50">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          </span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="flex items-center mb-4 text-lg font-semibold">
                      <XCircle className="w-5 h-5 mr-2 text-red-500" />
                      Areas to Improve
                    </h3>
                    <ul className="space-y-3">
                      {analysis.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-start">
                          <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1 mr-2 rounded-full bg-red-50">
                            <XCircle className="w-3 h-3 text-red-500" />
                          </span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Section Scores */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Section Scores</h3>
                  <div className="space-y-6">
                    {analysis.sectionScores.map((section, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{section.name}</span>
                        </div>
                        <Progress
                          value={section.score}
                          indicatorClassName={getBackgoundScoreColor(
                            section.score
                          )}
                        />
                        <p className="mt-1 text-sm text-muted-foreground">
                          {section.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Suggestions tab */}
            <TabsContent value="suggestions" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="flex items-center mb-4 text-lg font-semibold">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" />
                    AI-Enhanced Improvements
                  </h3>

                  <div className="space-y-8">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="pb-6 border-b border-border last:border-b-0 last:pb-0"
                      >
                        <div className="mb-3">
                          <span className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-md bg-secondary">
                            {suggestion.section}
                          </span>
                          <h4 className="font-medium">Suggested Improvement</h4>
                        </div>

                        {suggestion.original && (
                          <div className="mb-4">
                            <p className="mb-1 text-sm text-muted-foreground">
                              Original:
                            </p>
                            <p className="p-3 text-sm rounded-md bg-secondary/50">
                              {suggestion.original}
                            </p>
                          </div>
                        )}

                        <div className="mb-4">
                          <p className="mb-1 text-sm text-green-600">
                            Improved Version:
                          </p>
                          <p className="p-3 text-sm text-black border border-green-200 rounded-md bg-green-50">
                            {suggestion.improved}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-sm text-muted-foreground">
                            Why this works:
                          </p>
                          <p className="text-sm">{suggestion.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Keyword section */}
            <TabsContent value="keywords" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="flex items-center mb-4 text-lg font-semibold">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                    Keyword Analysis
                  </h3>

                  <p className="mb-6 text-muted-foreground">
                    Keywords are critical for passing through Applicant Tracking
                    Systems (ATS). Below are important keywords for your target
                    job role.
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {analysis.keywordMatch.map((keyword, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-md border",
                          keyword.found
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        )}
                      >
                        <div className="flex items-center">
                          {keyword.found ? (
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-2 text-red-500" />
                          )}
                          <span className="font-medium text-black">{keyword.keyword}</span>
                        </div>

                        <span
                          className={cn(
                            "px-2 py-1 text-xs rounded",
                            keyword.importance === "high"
                              ? "bg-red-100 text-red-800"
                              : keyword.importance === "medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          )}
                        >
                          {keyword.importance}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sections" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Detailed Section Analysis
                  </h3>

                  <div className="space-y-8">
                    {analysis.sectionScores.map((section, index) => (
                      <div
                        key={index}
                        className="pb-6 border-b border-border last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{section.name}</h4>
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              getScoreColor(section.score)
                            )}
                          >
                            {section.score}/100
                          </span>
                        </div>

                        <Progress
                          value={section.score}
                          indicatorClassName={getBackgoundScoreColor(
                            section.score
                          )}
                        />

                        <p className="mt-3 text-sm text-muted-foreground">
                          {section.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}
