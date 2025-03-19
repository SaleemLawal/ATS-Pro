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

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setisLoading] = useState(false);

  async function handleLogin(values: z.infer<typeof loginSchema>) {
    setisLoading(true);
    try {
      console.log("Logging in with:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Logged in successfully", {
        description: "Welcome back to ATS Pro!",
      });
      onClose();
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again",
      });
    } finally {
      setisLoading(false);
    }
  }

  async function handleRegister(values: z.infer<typeof registerSchema>) {
    setisLoading(true);
    try {
      console.log("Registering with:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Account created successfully", {
        description: "Welcome back to ATS Pro!",
      });
      onClose();
    } catch (error) {
      toast.error("Registration failed", {
        description: "Please check your information and try again",
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
      </DialogContent>
    </Dialog>
  );
}
