import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ExpandingCard({
  title = "Card Title",
  content = "Card content goes here",
  isVisible = false,
  delay = 0
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Show content after title animation
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6,
      }}
      className="relative mx-auto overflow-hidden rounded-lg shadow-md h-full"
      style={{ backgroundColor: 'rgba(60, 108, 168, 0.2)' }}
      role="alert"
      aria-live="polite"
    >
      <div className="p-6 h-full flex flex-col">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            delay: delay + 0.2,
            duration: 0.3,
          }}
          className="relative mb-4 text-center"
        >
          <h3 className="text-4xl font-extrabold" style={{ color: '#3c6ca8' }}>
            {title}
          </h3>
        </motion.div>

        <div className="relative flex-1">
          {/* Animated Content Wrapper */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={showContent ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              type: "tween",
            }}
            style={{ overflow: "hidden" }}
            className="flex-1"
          >
            {/* Animated Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: 0.7,
                duration: 0.6,
              }}
              className="pt-8 text-center"
            >
              <div className="text-lg leading-relaxed font-medium text-black">
                {content}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}