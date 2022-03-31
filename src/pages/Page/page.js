import React from "react";
import { useMediaQuery } from "react-responsive";
import { useAppState } from "../../context/AppContext";
import { motion } from "framer-motion";

export function Page(props) {
  const { reverse } = useAppState();
  const horizontal = useMediaQuery({ query: "(max-width: 1024px)" });

  let pageVariants = {
    initial: {
      y: reverse ? "-100vh" : "100vh",
    },
    in: {
      y: 0,
    },
    out: {
      y: reverse ? "100vh" : "-100vh",
    },
  };

  let pageVariantsX = {
    initial: {
      x: reverse ? "-100vw" : "100vw",
    },
    in: {
      x: 0,
    },
    out: {
      x: reverse ? "100vw" : "-100vw",
    },
  };

  const pageTransition = {
    type: "tween",
    duration: 0.5,
  };

  return (
    <motion.div className={`page ${props.className}`} id={props.id} initial="initial" animate="in" exit="out" variants={horizontal ? pageVariantsX : pageVariants} transition={pageTransition}>
      {props.children}
    </motion.div>
  );
}
