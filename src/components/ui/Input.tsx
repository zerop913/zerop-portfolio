"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Info } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  delay?: number;
  showPasswordToggle?: boolean;
  showPasswordRequirements?: boolean;
  onPasswordRequirementsClick?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  required = false,
  delay = 0,
  className = "",
  showPasswordToggle = false,
  showPasswordRequirements = false,
  onPasswordRequirementsClick,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <label className="block font-mono text-sm text-gray-300 mb-2">
        {label} {required && "*"}
      </label>
      <div className="relative">
        <input
          {...props}
          type={inputType}
          className={`w-full bg-gray-900/50 border ${
            error ? "border-red-500" : "border-gray-800"
          } px-4 py-3 ${
            isPasswordType ? "pr-20" : showPasswordRequirements ? "pr-12" : ""
          } text-white placeholder-gray-500 focus:outline-none ${
            error ? "focus:border-red-400" : "focus:border-gray-600"
          } transition-colors font-mono text-sm ${className}`}
        />
        {showPasswordRequirements && !isPasswordType && (
          <button
            type="button"
            onClick={onPasswordRequirementsClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
            tabIndex={-1}
          >
            <Info size={18} />
          </button>
        )}
        {isPasswordType && (
          <>
            {showPasswordRequirements && (
              <button
                type="button"
                onClick={onPasswordRequirementsClick}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                tabIndex={-1}
              >
                <Info size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};
