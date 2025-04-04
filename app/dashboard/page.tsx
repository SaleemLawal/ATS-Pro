import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MotionDiv } from "@/components/use-client";
import { Clock, Download, Eye, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

// Mock data for past analyses
const pastAnalyses = [
  {
    id: "1",
    title: "Software Engineer Resume",
    date: "2023-09-15",
    score: 78,
    jobRole: "Software Engineer",
  },
  {
    id: "2",
    title: "Product Manager Resume",
    date: "2023-08-22",
    score: 85,
    jobRole: "Product Manager",
  },
  {
    id: "3",
    title: "Data Scientist Resume",
    date: "2023-07-10",
    score: 62,
    jobRole: "Data Scientist",
  },
];

export default function DashboardPage() {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-32 pb-20">
        <div className="container-tight max-w-6xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="heading-2 mb-4">My Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl">
              View your resume history, track your improvements, and manage your
              job applications.
            </p>
          </MotionDiv>

          {/* Feature Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center justify-center gap-2"
              asChild
            >
              <Link href="/upload">
                <FileText className="h-6 w-6 mb-1" />
                <span className="font-medium">Upload Resume</span>
                <span className="text-xs text-muted-foreground">
                  Get AI analysis
                </span>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center justify-center gap-2"
              asChild
            >
              <Link href="/coverletter">
                <FileText className="h-6 w-6 mb-1" />
                <span className="font-medium">Generate Cover Letter</span>
                <span className="text-xs text-muted-foreground">
                  AI-powered cover letters
                </span>
              </Link>
            </Button>

            {/* <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center justify-center gap-2"
              asChild
            >
              <Link href="/admin">
                <FileText className="h-6 w-6 mb-1" />
                <span className="font-medium">Admin Dashboard</span>
                <span className="text-xs text-muted-foreground">
                  View analytics
                </span>
              </Link>
            </Button> */}
          </div>

          <Tabs defaultValue="resumes" className="w-full">
            <TabsList className="mb-6 w-full justify-start border-b rounded-none p-0 h-auto">
              <TabsTrigger value="resumes" className="py-3 px-4">
                My Resumes
              </TabsTrigger>
              <TabsTrigger value="jobs" className="py-3 px-4">
                Job Applications
              </TabsTrigger>
              <TabsTrigger value="coverletters" className="py-3 px-4">
                Cover Letters
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resumes" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Resume Analysis History
                </h2>
                <Button asChild>
                  <Link href="/upload">Upload New Resume</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastAnalyses.map((analysis) => (
                  <Card
                    key={analysis.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold truncate">
                          {analysis.title}
                        </h3>
                        <span
                          className={`text-lg font-bold ${getScoreColor(
                            analysis.score
                          )}`}
                        >
                          {analysis.score}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          {formatDate(analysis.date)}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Job Role:</span>{" "}
                          {analysis.jobRole}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="bg-muted/50 p-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link href={`/analysis?id=${analysis.id}`}>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" /> PDF
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Job Application Tracker
                </h2>
                <Button>Add Job Application</Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">
                  No job applications yet
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Start tracking your job applications to stay organized during
                  your job search.
                </p>
                <Button>Add Your First Job</Button>
              </div>
            </TabsContent>

            <TabsContent value="coverletters" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Generated Cover Letters
                </h2>
                <Button asChild>
                  <Link href="/coverletter">Create New Cover Letter</Link>
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">
                  No cover letters yet
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Generate custom cover letters based on your resume and job
                  descriptions.
                </p>
                <Button asChild>
                  <Link href="/coverletter">
                    Create Your First Cover Letter
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
