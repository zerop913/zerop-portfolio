"use client";

import React from "react";
import { motion } from "framer-motion";

interface ErrorBoxProps {
  message: string;
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-900/20 border border-red-800 px-4 py-3"
    >
      <p className="text-red-400 text-sm font-mono">{message}</p>
    </motion.div>
  );
};
