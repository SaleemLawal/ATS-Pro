"use client";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MotionH1, MotionP } from "@/components/use-client";
import { ChevronLeft, Copy, Download } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import jsPDF from "jspdf";
import { generateCoverLetter } from "@/actions/generateCoverLetter.action";

interface FormValues {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
}

export default function CoverLetter() {
  const [coverLetter, setCoverLetter] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobDescription: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsGenerating(true);

    const response = await generateCoverLetter(
      data.jobTitle,
      data.jobDescription,
      data.companyName
    );

    if (!response) {
      toast.error("Error generating cover letter", {
        description: "There was an error generating your cover letter.",
      });
      setIsGenerating(false);
      return;
    }

    setCoverLetter(response.message);
    setIsGenerating(false);

    toast.success("Cover Letter Generated", {
      description: "Your custom cover letter has been created successfully.",
    });
  };

  const handleCopy = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      toast.info("Copied to clipboard", {
        description: "Cover letter has been copied to your clipboard.",
      });
    }
  };

  const handleDownload = () => {
    if (coverLetter) {
      const doc = new jsPDF();
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(coverLetter, 180);
      doc.text(splitText, 15, 15);
      doc.save("cover-letter.pdf");

      toast.info("Download Started", {
        description: "Your cover letter is being downloaded as PDF.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-32 pb-20">
        <div className="container-narrow">
          <div className="mb-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
            </Link>

            <MotionH1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="heading-2 mb-4 text-center"
            >
              Cover Letter Generator
            </MotionH1>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center text-muted-foreground max-w-2xl mx-auto"
            >
              Generate a customized cover letter based on your resume and job
              description.
            </MotionP>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="lg:sticky lg:top-28 h-fit">
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Software Engineer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Acme Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste the job description here..."
                              className="min-h-[200px] max-h-[450px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate Cover Letter"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div>
              {coverLetter ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Your Cover Letter</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
                      {coverLetter}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-muted-foreground mb-4">
                      Your generated cover letter will appear here.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Fill in the job details form and click &ldquo;Generate
                      Cover Letter&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
