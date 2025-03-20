"use client";
import { Provider } from "@supabase/supabase-js";
import { GithubIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { OAuthSignIn } from "@/actions/login.action";
import { FcGoogle } from "react-icons/fc";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: React.JSX.Element;
};

export function OAuthButtons({ type }: { type: string }) {
  const OAuthProviders: OAuthProvider[] = [
    {
      name: "github",
      displayName: "GitHub",
      icon: <GithubIcon className="size-5" />,
    },
    {
      name: "google",
      displayName: "Google",
      icon: <FcGoogle className="size-5" />,
    },
  ];

  const handleClick = async (provider: Provider) => {
    await OAuthSignIn(provider);
  };

  return (
    <>
      {OAuthProviders.map((provider) => (
        <Button
          key={provider.displayName}
          variant={"outline"}
          className="flex items-center justify-center w-full gap-2"
          onClick={() => handleClick(provider.name)}
        >
          {provider.icon}
          {type} with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
