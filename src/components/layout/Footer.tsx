"use client";

import { useTheme } from "@/hooks/useTheme";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`border-t py-8 transition-colors duration-300 ${
        isDark ? "bg-black border-green-400/30" : "bg-white border-green-600/30"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Terminal-style copyright */}
          <div
            className={`font-mono text-sm space-y-2 ${
              isDark ? "text-green-400" : "text-green-600"
            }`}
          >
            <div
              className={`text-xs ${
                isDark ? "text-green-300" : "text-green-700"
              }`}
            >
              user@portfolio:~$ cat /sys/info/copyright.txt
            </div>
            <div
              className={`text-xs ${
                isDark ? "text-green-200" : "text-green-800"
              }`}
            >
              © {new Date().getFullYear()} ivan.dev - All rights reserved |
              Build v1.0.0
            </div>
            <div
              className={`text-xs mt-2 ${
                isDark ? "text-green-400" : "text-green-600"
              }`}
            >
              [STATUS: OPERATIONAL] [UPTIME: 99.9%] [LAST_BUILD:{" "}
              {new Date().toLocaleDateString()}]
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                isDark ? "bg-green-400" : "bg-green-600"
              }`}
            ></div>
            <span
              className={`font-mono text-xs ${
                isDark ? "text-green-400" : "text-green-600"
              }`}
            >
              SYSTEM_ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
