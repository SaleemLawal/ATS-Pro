"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginForm from "@/components/Form/LoginForm";
import { useRouter } from "next/navigation";
import { passwordSignIn } from "@/actions/login.action";
import { toast } from "sonner";
import { loginSchema } from "@/schema/loginSchema";
import { z } from "zod";
import { OAuthButtons } from "@/components/OAuthSignIn";
import Link from "next/link";

export default function Login() {
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  async function handleLogin(values: z.infer<typeof loginSchema>) {
    setisLoading(true);
    try {
      const result = await passwordSignIn(values);

      if (result?.success) router.push("/upload");

      toast.success("Logged in successfully", {
        description: "Welcome back to ATS Pro!",
      });
      setIsOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Please check your credentials and try again";

      toast.error("Login failed", {
        description: errorMessage,
      });
    } finally {
      setisLoading(false);
    }
  }
  return (
    <div className="relative min-h-screen mt-20 container-tight">
      {/* Log in page */}
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
          router.push("/");
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-center!">
            <DialogTitle>Sign in</DialogTitle>
            <DialogDescription>
              Enter your email and password to sign in to your account
            </DialogDescription>
          </DialogHeader>

          <LoginForm handleLogin={handleLogin} isLoading={isLoading} />

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
              Don't have an account?{" "}
              <Link href="/signup" className="underline hover:text-primary">
                Sign up
              </Link>
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
