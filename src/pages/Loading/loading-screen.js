import React from "react";
import { motion } from "framer-motion";

const loadingScreen = {
  position: "absolute",
  inset: "0 0 0 0",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const loadingContainer = {
  width: "6rem",
  height: "6rem",
  display: "flex",
  justifyContent: "space-around",
};

const loadingCircle = {
  display: "block",
  width: "1.5rem",
  height: "1.5rem",
  backgroundColor: "var(--red-300)",
  borderRadius: ".75rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "150%",
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

export function LoadingScreen() {
  return (
    <div className="loading-screen" style={loadingScreen}>
      <motion.div style={loadingContainer} variants={loadingContainerVariants} initial="start" animate="end">
        <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition} />
        <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition} />
        <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition} />
      </motion.div>
    </div>
  );
}
