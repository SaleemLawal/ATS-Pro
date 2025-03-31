"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import JobRoleSelector from "@/components/JobRoleSelector";
import { useEffect, useState } from "react";
import UploadBox from "@/components/UploadBox";
import { useResume } from "@/context/ResumeContext";
import AnalysisResult from "@/components/AnalysisResult";
import { MotionH1, MotionP } from "@/components/use-client";
import Footer from "@/components/Footer";

export default function UploadPage() {
  const { uploadState, analysis, resetState } = useResume();
  const [jobRole, setJobRole] = useState("software_engineer");
  useEffect(() => {
    resetState();
  }, []);
  return (
    <div className="relative flex flex-col min-h-screen">
      <main className="flex-1 pt-32 pb-20">
        <div className="container-narrow">
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center mb-4 text-sm transition-colors text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
            </Link>
            <MotionH1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-center heading-2"
            >
              {uploadState.status === "complete" && analysis
                ? "Your Resume Analysis"
                : "Upload Your Resume"}
            </MotionH1>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto text-center text-muted-foreground"
            >
              {uploadState.status === "complete" && analysis
                ? "See how your resume stacks up and get AI-powered suggestions to improve it."
                : "Upload your resume in PDF or Word format to get personalized AI feedback and improvements."}
            </MotionP>
          </div>

          {(!analysis || uploadState.status !== "complete") && (
            <>
              <div className="mb-8">
                <Card>
                  <CardContent className="p-6">
                    <JobRoleSelector value={jobRole} onChange={setJobRole} />
                  </CardContent>
                </Card>
              </div>
              <UploadBox role={jobRole} />
            </>
          )}

          {analysis && uploadState.status === "complete" && (
            <AnalysisResult analysis={analysis} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
