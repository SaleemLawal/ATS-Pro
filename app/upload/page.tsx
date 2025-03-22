"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import JobRoleSelector from "@/components/JobRoleSelector";
import { useState } from "react";
import UploadBox from "@/components/UploadBox";

export default function UploadPage() {
  const [jobRole, setJobRole] = useState("software_engineer");
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-center heading-2"
            >
              {/* TODO: Fix status  */}
              Upload your resume
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto text-center text-muted-foreground"
            >
              Upload your resume in PDF or Word format to get personalized AI
              feedback and improvements.
            </motion.p>
          </div>

          <>
            <div className="mb-8">
              <Card>
                <CardContent className="p-6">
                  <JobRoleSelector value={jobRole} onChange={setJobRole} />
                </CardContent>
              </Card>
            </div>
            <UploadBox />
          </>
        </div>
      </main>
    </div>
  );
}
