"use client";

import React from "react";
import { motion } from "framer-motion";

interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
  error?: string;
  delay?: number;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
  error,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            className="sr-only"
          />
          <label
            htmlFor={id}
            className="cursor-pointer flex items-center space-x-3"
          >
            <div
              className={`w-4 h-4 border ${
                error ? "border-red-500" : "border-gray-800"
              } bg-gray-900/50 transition-all duration-200 flex items-center justify-center ${
                checked
                  ? error
                    ? "border-red-400 bg-red-500/5"
                    : "border-white bg-white/5"
                  : error
                  ? "hover:border-red-400"
                  : "hover:border-gray-600"
              }`}
            >
              {checked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-2 h-2 bg-white"
                />
              )}
            </div>
            <span className="text-sm text-gray-300 font-mono">{label}</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
};
