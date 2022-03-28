import React, { useEffect } from "react";
import { motion } from "framer-motion";

export function Page(props) {
  useEffect(() => {
    props.setReverse(false);
  }, []);

  let pageVariants = {
    initial: {
      y: props.reverse || props.localReverse ? "-100vh" : "100vh",
    },
    in: {
      y: 0,
    },
    out: {
      y: props.reverse || props.localReverse ? "100vh" : "-100vh",
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
