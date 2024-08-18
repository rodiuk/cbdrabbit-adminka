import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";

interface AnimateButtonProps {
  children: React.ReactNode;
  offset?: number;
  type?: "slide" | "scale" | "rotate";
  direction?: "up" | "down" | "left" | "right";
  scale?: number | { hover: number; tap: number };
}

const AnimateButton = function AnimateButton({
  children,
  type = "scale",
  direction = "right",
  offset = 0,
  scale = 1,
}: AnimateButtonProps) {
  let offset1: number, offset2: number;
  switch (direction) {
    case "up":
    case "left":
      offset1 = -offset;
      offset2 = 0;
      break;
    case "down":
    case "right":
    default:
      offset1 = 0;
      offset2 = offset;
      break;
  }

  const [x, cycleX] = useCycle(offset1, offset2);
  const [y, cycleY] = useCycle(offset1, offset2);

  switch (type) {
    case "rotate":
      return (
        <motion.div
          // ref={ref}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
          }}
        >
          {children}
        </motion.div>
      );
    case "slide":
      return (
        <motion.div
          // ref={ref}
          animate={direction === "up" || direction === "down" ? { y } : { x }}
          onHoverStart={() => {
            if (direction === "up" || direction === "down") cycleY();
            else cycleX();
          }}
          onHoverEnd={() => {
            if (direction === "up" || direction === "down") cycleY();
            else cycleX();
          }}
        >
          {children}
        </motion.div>
      );
    case "scale":
    default:
      const scaleValues =
        typeof scale === "number" ? { hover: scale, tap: scale } : scale;
      return (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            // ref={ref}
            whileHover={{ scale: scaleValues?.hover || 1 }}
            whileTap={{ scale: scaleValues?.tap || 1 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      );
  }
};

export default AnimateButton;
