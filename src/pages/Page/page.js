import React from "react";
import { useAppState } from "../../context/AppContext";
import { motion } from "framer-motion";

export function Page(props) {
  const { reverse } = useAppState();

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

  const pageTransition = {
    type: "tween",
    duration: 0.5,
  };

  return (
    <motion.div className={`page ${props.className}`} id={props.id} initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      {props.children}
    </motion.div>
  );
}
