import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MobileInfoCard({
  title = "Card Title",
  content = "Card content goes here",
  isVisible = false,
  delay = 0
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Show content after title animation
      const timer = setTimeout(() => setShowContent(true), 500 + delay * 1000);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible, delay]);

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
      className="p-6 rounded-lg shadow-lg border border-gray-200 h-full flex flex-col"
      style={{ backgroundColor: 'rgba(60, 108, 168, 0.2)' }}
    >
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
        <h3 className="text-4xl font-extrabold" style={{ color: '#3c6ca8' }}>{title}</h3>
      </motion.div>

      <div className="relative flex-1 flex flex-col">
        {/* Animated Content */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={showContent ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
          className="text-black overflow-hidden flex-1 flex items-center"
        >
          <div className="text-md leading-relaxed">
            {content}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}