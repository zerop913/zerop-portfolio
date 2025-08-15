"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  delay?: number;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  loadingText = "Загрузка",
  delay = 0,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-mono text-sm py-3 px-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2";

  const variantClasses = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary:
      "border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white bg-transparent",
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      type={props.type}
      disabled={props.disabled || isLoading}
      onClick={props.onClick}
    >
      {isLoading ? (
        <>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-current animate-pulse"></div>
            <div
              className="w-1 h-1 bg-current animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-1 h-1 bg-current animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};
