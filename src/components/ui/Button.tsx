"use client";

import { useTheme } from "@/hooks/useTheme";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "terminal";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  disabled = false,
}: ButtonProps) {
  const { isDark } = useTheme();
  const baseClasses =
    "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return isDark
          ? "bg-green-500 text-black hover:bg-green-400 focus:ring-green-400 shadow-lg hover:shadow-green-500/25 hover:shadow-xl"
          : "bg-green-600 text-white hover:bg-green-500 focus:ring-green-500 shadow-lg hover:shadow-green-600/25 hover:shadow-xl";

      case "secondary":
        return isDark
          ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500 border border-gray-600 hover:border-gray-500"
          : "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400 border border-gray-200 hover:border-gray-300";

      case "outline":
        return isDark
          ? "border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black focus:ring-green-400 bg-transparent"
          : "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-green-500 bg-transparent";
      case "terminal":
        return isDark
          ? "bg-gray-900 text-green-400 border border-green-400/50 hover:border-green-400 hover:bg-gray-800 focus:ring-green-400 font-mono"
          : "bg-gray-50 text-green-600 border border-green-600/50 hover:border-green-600 hover:bg-gray-100 focus:ring-green-500 font-mono";

      default:
        return "";
    }
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-sm min-h-[44px]",
    lg: "px-8 py-4 text-base min-h-[52px]",
  };
  const classes = `${baseClasses} ${getVariantClasses()} ${
    sizeClasses[size]
  } ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
