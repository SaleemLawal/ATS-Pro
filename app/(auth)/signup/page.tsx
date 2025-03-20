"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { OAuthButtons } from "@/components/OAuthSignIn";
import Link from "next/link";
import { registerSchema } from "@/schema/registerSchema";
import { passwordSignUp } from "@/actions/signup.action";
import RegisterForm from "@/components/Form/RegisterForm";

export default function SignUp() {
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  async function handleRegister(values: z.infer<typeof registerSchema>) {
    setisLoading(true);
    try {
      const result = await passwordSignUp(values);
      if (result?.success) router.push("/");
      toast.success("Account created successfully", {
        description: "Welcome to ATS Pro!",
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Please check your information and try again";

      toast.error("Registration failed", {
        description: errorMessage,
      });
    } finally {
      setisLoading(false);
    }
  }
  return (
    <div className="relative min-h-screen mt-20 container-tight">
      {/* Register page */}
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
          router.push("/");
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-center!">
            <DialogTitle>Create an account</DialogTitle>
            <DialogDescription>
              Enter your information to create an account
            </DialogDescription>
          </DialogHeader>

          <RegisterForm handleRegister={handleRegister} isLoading={isLoading} />

          <div className="flex flex-col gap-2 mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <OAuthButtons type="Login" />
            </div>
          </div>

          <div className="text-sm text-center text-muted-foreground">
            <span>
              Already have an account?{" "}
              <Link href="/signin" className="underline hover:text-primary">
                Sign In
              </Link>
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
