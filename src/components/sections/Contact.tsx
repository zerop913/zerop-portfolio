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
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {" "}
          {/* Terminal Window */}
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
                  Terminal - Contact
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
            </div>{" "}
            {/* Terminal Content */}
            <div
              className={`p-6 font-mono text-sm ${
                isDark
                  ? "text-green-400 bg-gray-900"
                  : "text-green-700 bg-white"
              } rounded-b-lg relative overflow-hidden`}
            >
              {" "}
              <div className="relative z-10">
                <pre className="whitespace-pre-wrap">
                  {terminalOutput}
                  {jsonVisible && (
                    <div
                      className={`animate-fade-in mt-1 ${
                        isDark ? "text-blue-300" : "text-green-700"
                      }`}
                    >
                      {jsonOutput}
                    </div>
                  )}
                  {currentPhase === "final" && (
                    <div className="mt-1">{finalOutput}</div>
                  )}{" "}
                  {showCursor && currentPhase !== "final" && (
                    <span
                      className={`inline-block w-2 h-5 ml-1 ${
                        isDark ? "bg-green-400" : "bg-green-700"
                      }`}
                    ></span>
                  )}
                  {showCursor &&
                    currentPhase === "final" &&
                    !isTypingComplete && (
                      <span
                        className={`inline-block w-2 h-5 ml-1 ${
                          isDark ? "bg-green-400" : "bg-green-700"
                        }`}
                      ></span>
                    )}
                </pre>

                {/* Interactive Prompt */}
                {isTypingComplete && (
                  <div className="mt-6 space-y-2 animate-fade-in">
                    <div
                      className={`flex items-center space-x-2 ${
                        isDark ? "text-green-400" : "text-green-700"
                      }`}
                    >
                      <span>ivan@portfolio:~$</span>
                      <span
                        className={`${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        _
                      </span>
                    </div>

                    {/* Available Commands */}
                    <div
                      className={`mt-4 text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      <div className="mb-2 opacity-60">
                        # Available commands:
                      </div>
                      <div className="space-y-1 opacity-40">
                        <div>./view-portfolio # Browse my work</div>
                        <div>./check-skills # List technologies</div>
                        <div>./send-message # Quick contact</div>
                        <div>./download-cv # Get resume</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Contact Actions */}
          <div
            className={`space-y-8 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            } transition-all duration-300 delay-500`}
          >
            {/* Profile Card */}
            <div
              className={`${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              } rounded-lg border p-8`}
            >
              <div className="text-center mb-6">
                <div
                  className={`w-24 h-24 mx-auto mb-6 rounded-full ${
                    isDark ? "bg-gray-700" : "bg-white"
                  } border-4 border-green-500 flex items-center justify-center text-3xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {personalData.name[0]}
                </div>

                <h3
                  className={`text-2xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {personalData.name}
                </h3>

                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } font-mono text-sm`}
                >
                  {personalData.title}
                </p>
              </div>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div
                  className={`${
                    isDark ? "bg-gray-700" : "bg-white"
                  } rounded-lg p-4 text-center border ${
                    isDark ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold mb-1 ${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    &lt;24h
                  </div>
                  <div
                    className={`text-xs font-mono ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    response_time
                  </div>
                </div>

                <div
                  className={`${
                    isDark ? "bg-gray-700" : "bg-white"
                  } rounded-lg p-4 text-center border ${
                    isDark ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold mb-1 ${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    24/7
                  </div>
                  <div
                    className={`text-xs font-mono ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    availability
                  </div>
                </div>
              </div>{" "}
              {/* Contact Button */}
              <Button
                href={personalData.telegramUrl}
                variant="terminal"
                size="lg"
                className="w-full"
                external
              >
                ./connect-telegram.sh
              </Button>
            </div>

            {/* Additional Info */}
            <div
              className={`${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              } rounded-lg border p-6`}
            >
              <h4
                className={`font-mono text-sm mb-4 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                # Connection Info
              </h4>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    protocol:
                  </span>
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    "telegram"
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    encryption:
                  </span>
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    "end-to-end"
                  </span>
                </div> */}
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    status:
                  </span>
                  <span className="text-green-500">"online"</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div
              className={`text-center text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              } font-mono`}
            >
              #{" "}
              {personalData.contactNote ||
                "Let's build something amazing together!"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
