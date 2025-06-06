import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  type?: "fade" | "slide-up" | "slide-right" | "scale" | "slide-left";
}

export function AnimatedContainer({
  children,
  delay = 0,
  className = "",
  type = "fade",
}: AnimatedContainerProps) {
  const getAnimationProps = () => {
    switch (type) {
      case "slide-up":
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };
      case "slide-right":
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay },
        };
      case "slide-left":
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay },
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, delay },
        };
      case "fade":
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay },
        };
    }
  };

  return (
    <motion.div className={className} {...getAnimationProps()}>
      {children}
    </motion.div>
  );
}
