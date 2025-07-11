"use client";

import { personalData } from "@/data/personal";
import {
  terminalCommands,
  jsonOutput,
  finalCommands,
  terminalConfig,
} from "@/data/terminal";
import Button from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect } from "react";

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const { isDark } = useTheme();
  const [terminalOutput, setTerminalOutput] = useState("");
  const [jsonVisible, setJsonVisible] = useState(false);
  const [finalOutput, setFinalOutput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<
    "initial" | "json" | "final"
  >("initial");

  useEffect(() => {
    if (!isVisible) return;

    let commandIndex = 0;
    let charIndex = 0;
    let currentOutput = "";

    const typeInitialCommands = () => {
      const timer = setInterval(() => {
        if (commandIndex < terminalCommands.length) {
          const currentCommand = terminalCommands[commandIndex];

          if (charIndex < currentCommand.length) {
            currentOutput += currentCommand[charIndex];
            setTerminalOutput(currentOutput);
            charIndex++;
          } else {
            commandIndex++;
            charIndex = 0;
            currentOutput += "\n";

            if (commandIndex === terminalConfig.connectionEstablishedIndex) {
              setIsConnected(true);
            }
          }
        } else {
          clearInterval(timer);
          setCurrentPhase("json");
          // После завершения ввода команды cat, показываем JSON
          setTimeout(() => {
            setJsonVisible(true);
            setTimeout(() => {
              setCurrentPhase("final");
              typeFinalCommands();
            }, terminalConfig.jsonAppearDelay);
          }, terminalConfig.jsonAppearDelay);
        }
      }, terminalConfig.typingSpeed);
    };

    const typeFinalCommands = () => {
      let finalCommandIndex = 0;
      let finalCharIndex = 0;
      let finalCurrentOutput = "";

      const finalTimer = setInterval(() => {
        if (finalCommandIndex < finalCommands.length) {
          const currentCommand = finalCommands[finalCommandIndex];

          if (finalCharIndex < currentCommand.length) {
            finalCurrentOutput += currentCommand[finalCharIndex];
            setFinalOutput(finalCurrentOutput);
            finalCharIndex++;
          } else {
            finalCommandIndex++;
            finalCharIndex = 0;
            finalCurrentOutput += "\n";
          }
        } else {
          clearInterval(finalTimer);
          setIsTypingComplete(true);
          setShowCursor(false);
        }
      }, terminalConfig.typingSpeed);
    };

    const delay = setTimeout(typeInitialCommands, 1000);
    return () => clearTimeout(delay);
  }, [isVisible]);

  useEffect(() => {
    if (isTypingComplete) return; // Don't blink cursor after typing is complete

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isTypingComplete]);

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-20 transition-all duration-700 ${
        isDark ? "bg-gray-900" : "bg-white"
      } ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-5xl md:text-7xl font-bold mb-6 font-mono ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            ./contact<span className="text-green-500">.sh</span>
          </h2>
          <p
            className={`text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Готовы обсудить ваш проект?
          </p>
        </div>{" "}
        <div className="max-w-4xl mx-auto">
          {/* Unified Terminal Window */}
          <div
            className={`rounded-lg shadow-xl border transition-all duration-300 ${
              isDark ? "border-gray-700" : "border-gray-300"
            } ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
            {/* Terminal Header */}
            <div
              className={`${
                isDark ? "bg-gray-700" : "bg-gray-200"
              } rounded-t-lg px-4 py-3 flex items-center justify-between`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span
                  className={`text-sm font-mono ml-4 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Terminal - Contact Session
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-green-500 animate-pulse" : "bg-yellow-500"
                  }`}
                ></div>
                <span
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {isConnected ? "Connected" : "Connecting..."}
                </span>
              </div>
            </div>

            {/* Terminal Content */}
            <div
              className={`p-6 font-mono text-sm ${
                isDark
                  ? "text-green-400 bg-gray-900"
                  : "text-green-700 bg-white"
              } rounded-b-lg relative overflow-hidden min-h-[400px]`}
            >
              <div className="relative z-10">
                {" "}
                {/* Animated Connection Commands */}
                <pre className="whitespace-pre-wrap">
                  {terminalOutput}
                  {showCursor &&
                    !isTypingComplete &&
                    currentPhase === "initial" && (
                      <span
                        className={`inline-block w-2 h-5 ${
                          isDark ? "bg-green-400" : "bg-green-700"
                        }`}
                      ></span>
                    )}
                </pre>
                {/* JSON Output */}
                {jsonVisible && (
                  <div
                    className={`animate-fade-in mt-4 ${
                      isDark ? "text-green-400" : "text-green-700"
                    }`}
                  >
                    {jsonOutput}
                  </div>
                )}
                {/* Additional Commands after JSON */}
                {currentPhase === "final" && (
                  <div className="mt-4">
                    <div className="mb-4">
                      <div
                        className={`${
                          isDark ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        <span className="opacity-60">ivan@portfolio:~$</span>{" "}
                        <span>whoami</span>
                      </div>
                      <div
                        className={`ml-4 mt-1 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {personalData.name} - {personalData.title}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div
                        className={`${
                          isDark ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        <span className="opacity-60">ivan@portfolio:~$</span>{" "}
                        <span>contact --info</span>
                      </div>
                      <div
                        className={`ml-4 mt-1 space-y-1 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className={`${
                              isDark ? "text-purple-400" : "text-purple-600"
                            }`}
                          >
                            →
                          </span>
                          <span>Platform: Telegram</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`${
                              isDark ? "text-purple-400" : "text-purple-600"
                            }`}
                          >
                            →
                          </span>
                          <span>Username: @zerop913</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`${
                              isDark ? "text-purple-400" : "text-purple-600"
                            }`}
                          >
                            →
                          </span>
                          <span>Status: </span>
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          <span
                            className={`${
                              isDark ? "text-green-400" : "text-green-600"
                            }`}
                          >
                            Online
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <pre className="whitespace-pre-wrap">
                        {finalOutput}
                        {showCursor &&
                          !isTypingComplete &&
                          currentPhase === "final" && (
                            <span
                              className={`inline-block w-2 h-5 ${
                                isDark ? "bg-green-400" : "bg-green-700"
                              }`}
                            ></span>
                          )}
                      </pre>
                    </div>
                  </div>
                )}
                {/* Interactive Prompt after completion */}
                {isTypingComplete && (
                  <div className="mt-6 space-y-4 animate-fade-in">
                    <div
                      className={`flex items-center space-x-2 ${
                        isDark ? "text-green-400" : "text-green-700"
                      }`}
                    >
                      <span>ivan@portfolio:~$</span>
                      <span className="animate-pulse">_</span>
                    </div>

                    {/* Help text */}
                    <div
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      } space-y-1`}
                    >
                      <div className="opacity-60"># Ready for connection</div>
                      <div className="opacity-40">
                        Use the button below to start conversation
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Connect Button */}
          <div className="mt-6 text-center">
            <Button
              href={personalData.telegramUrl}
              variant="terminal"
              size="lg"
              className="min-w-[280px]"
              external
            >
              ./connect-telegram.sh
            </Button>
          </div>

          {/* Note */}
          <div
            className={`text-center text-sm mt-6 ${
              isDark ? "text-gray-400" : "text-gray-500"
            } font-mono`}
          >
            {" "}
            #{" "}
            {personalData.contactNote ||
              "Let's build something amazing together!"}
          </div>
        </div>
      </div>
    </section>
  );
}
