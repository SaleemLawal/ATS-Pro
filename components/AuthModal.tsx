"use client";
import React, { useState } from "react";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import { loginSchema } from "@/schema/loginSchema";
import LoginForm from "./Form/LoginForm";
import RegisterForm from "./Form/RegisterForm";
import { registerSchema } from "@/schema/registerSchema";
import { passwordSignIn } from "@/action/login.action";
import { passwordSignUp } from "@/action/signup.action";
import { useRouter } from "next/navigation";
import { OAuthButtons } from "./OAuthSignIn";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(values: z.infer<typeof loginSchema>) {
    setisLoading(true);
    try {
      const result = await passwordSignIn(values);

      if (result?.success) router.push("/");

      toast.success("Logged in successfully", {
        description: "Welcome back to ATS Pro!",
      });
      onClose();
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

  async function handleRegister(values: z.infer<typeof registerSchema>) {
    setisLoading(true);
    try {
      const result = await passwordSignUp(values);
      if (result?.success) router.push("/");
      toast.success("Account created successfully", {
        description: "Welcome to ATS Pro!",
      });

      onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Sign in or create an account to access all features
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm handleLogin={handleLogin} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="signup">
            <RegisterForm
              handleRegister={handleRegister}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex flex-col gap-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <OAuthButtons type="Login" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
