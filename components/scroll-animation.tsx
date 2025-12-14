// components/scroll-animation.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

export default function ScrollAnimation(props: PropsWithChildren) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: 0,
        ease: "easeOut",
      }}
    >
      {props.children}
    </motion.div>
  );
}
