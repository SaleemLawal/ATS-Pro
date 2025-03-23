"use client";

import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type MotionH1Props = HTMLMotionProps<"h1">;
type MotionH2Props = HTMLMotionProps<"h2">;
type MotionParagraphProps = HTMLMotionProps<"p">;
type MotionDivProps = HTMLMotionProps<"div">;

const MotionH1 = React.forwardRef<HTMLHeadingElement, MotionH1Props>(
  function MotionH1({ children, ...props }, ref) {
    return (
      <motion.h1 ref={ref} {...props}>
        {children}
      </motion.h1>
    );
  }
);

const MotionH2 = React.forwardRef<HTMLHeadingElement, MotionH2Props>(
  function MotionH2({ children, ...props }, ref) {
    return (
      <motion.h2 ref={ref} {...props}>
        {children}
      </motion.h2>
    );
  }
);

const MotionP = React.forwardRef<HTMLHeadingElement, MotionParagraphProps>(
  function MotionP({ children, ...props }, ref) {
    return (
      <motion.p ref={ref} {...props}>
        {children}
      </motion.p>
    );
  }
);

const MotionDiv = React.forwardRef<HTMLHeadingElement, MotionDivProps>(
  function MotionDiv({ children, ...props }, ref) {
    return (
      <motion.div ref={ref} {...props}>
        {children}
      </motion.div>
    );
  }
);

export { MotionH1, MotionP, MotionDiv, MotionH2 };
