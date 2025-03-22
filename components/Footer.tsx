import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="py-6 container-tight">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4 space-x-2">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                ResumeGenius
              </span>
            </Link>
            <p className="max-w-md mb-4 text-muted-foreground">
              AI-powered resume analysis and improvement tool to help you land
              your dream job with confidence.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>

              <Link
                href="#"
                className="transition-colors text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>

              <Link
                href="#"
                className="transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Github"
              >
                <Github size={20} />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors text-muted-foreground hover:text-foreground"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors text-muted-foreground hover:text-foreground"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors text-muted-foreground hover:text-foreground"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t border-border md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ResumeGenius. All rights reserved.
          </p>
          <p className="mt-4 text-sm text-muted-foreground md:mt-0">
            Designed with precision and care
          </p>
        </div> */}
      </div>
    </footer>
  );
}
