"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Loader2,
  Upload,
} from "lucide-react";
import { useResume } from "@/context/ResumeContext";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { MotionDiv } from "./use-client";

export default function UploadBox({ role }: { role: string }) {
  const { uploadState, uploadResume } = useResume();
  const [dragActive, setDragActive] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      // check file type
      const fileType = file.type;
      if (
        !(
          fileType === "application/pdf" ||
          fileType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          fileType === "application/msword"
        )
      ) {
        toast.error("Invalid file type", {
          description:
            "Please upload a PDF or Word document (.pdf, .doc, .docx",
        });
        return;
      }
      // check file size
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please upload a file smaller than 10MB",
        });
        return;
      }
      uploadResume(file, role);
    },
    [uploadResume, role]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false),
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      {(uploadState.status === "idle" || uploadState.status === "error") && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "border-2 border-dashed rounded-xl p-10 text-center transition-all",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border bg-background hover:bg-accent/50",
            uploadState.status === "error" &&
              "border-destructive/50 bg-destructive/5"
          )}
        >
          <div {...getRootProps()} className="outline-none">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              {uploadState.status === "error" ? (
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-destructive/10">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
              )}

              <h3 className="mb-2 text-lg font-medium">
                {uploadState.status === "error"
                  ? "Upload failed"
                  : "Upload your resume"}
              </h3>
              <p className="max-w-md mb-6 text-sm text-muted-foreground">
                {uploadState.status === "error"
                  ? uploadState.error || "An error occured. Please try again."
                  : " Drag and drop your resume file or click to browse"}
              </p>

              <div className="text-sx text-muted-foreground">
                Accepted formats: .pdf, .doc, .docx (Max 10MB)
              </div>
            </div>
          </div>
        </MotionDiv>
      )}

      {(uploadState.status === "uploading" ||
        uploadState.status === "analyzing") && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-10 text-center border shadow-sm rounded-xl bg-background"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
              {uploadState.status === "uploading" ? (
                <FileText className="w-8 h-8 text-primary animate-pulse" />
              ) : (
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              )}
            </div>

            <h3 className="mb-2 text-lg font-medium">
              {uploadState.status === "uploading"
                ? "uploading resume..."
                : "Analyzing your resume..."}
            </h3>

            <p className="mb-6 text-sm text-muted-foreground">
              {uploadState.status === "uploading"
                ? "This will only take a moment"
                : "Our AI is reviewing your resume"}
            </p>

            <div className="w-full max-w-md mb-4">
              <Progress value={uploadState.progress} className="h-2" />
            </div>

            <p className="text-xs text-muted-foreground">
              {uploadState.file?.name}
            </p>
          </div>
        </MotionDiv>
      )}

      {uploadState.status === "complete" && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-10 text-center border shadow-sm rounded-xl bg-background"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-50">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>

            <h3 className="mb-2 text-lg font-medium">Analysis Complete!</h3>

            <p className="mb-6 text-sm text-muted-foreground">
              Your resume has been analyzed successfully. View your detailed
              results below.
            </p>

            <p className="mb-4 text-xs text-muted-foreground">
              {uploadState.file?.name}
            </p>

            <Button className="btn-primary">View Analysis</Button>
          </div>
        </MotionDiv>
      )}
    </div>
  );
}
