"use client";

import { personalData } from "@/data/personal";
import Button from "@/components/ui/Button";
import { useClientOnly } from "@/hooks/useClientOnly";
import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect } from "react";

export default function Hero() {
  const mounted = useClientOnly();
  const { isDark } = useTheme();

  // State for skill typewriter animation only
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [displayedSkill, setDisplayedSkill] = useState("");
  const [showSkillCursor, setShowSkillCursor] = useState(true);

  // Skills typing effect
  useEffect(() => {
    if (!mounted) return;

    const skills = personalData.skills;
    let currentIndex = 0;

    const typeSkill = () => {
      const skill = skills[currentIndex];
      setDisplayedSkill("");

      let charIndex = 0;
      const typeChar = () => {
        if (charIndex <= skill.length) {
          setDisplayedSkill(skill.slice(0, charIndex));
          charIndex++;
          setTimeout(typeChar, 100);
        } else {
          // Hold for 3 seconds
          setTimeout(() => {
            // Erase
            let eraseIndex = skill.length;
            const eraseChar = () => {
              if (eraseIndex >= 0) {
                setDisplayedSkill(skill.slice(0, eraseIndex));
                eraseIndex--;
                setTimeout(eraseChar, 50);
              } else {
                // Move to next skill
                currentIndex = (currentIndex + 1) % skills.length;
                setCurrentSkillIndex(currentIndex);
                setTimeout(typeSkill, 500);
              }
            };
            eraseChar();
          }, 3000);
        }
      };
      typeChar();
    };

    const startSkillTyping = setTimeout(typeSkill, 2000);

    return () => clearTimeout(startSkillTyping);
  }, [mounted]);

  return (
    <section
      id="hero"
      className={`min-h-screen pt-16 flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`w-full h-full bg-repeat`}
          style={{
            backgroundImage: `radial-gradient(circle, ${
              isDark ? "#ffffff" : "#000000"
            } 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>{" "}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          {" "}
          {/* Static name without typewriter effect */}
          <div className="mb-8">
            {" "}
            <h1
              className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-tight mb-6 break-words ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {personalData.name.split("").map((letter, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-default ${
                    mounted ? "animate-fade-in" : "opacity-0"
                  } ${letter === " " ? "w-4" : ""}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    color:
                      letter === " "
                        ? "transparent"
                        : index % 2 === 0
                        ? isDark
                          ? "#ffffff"
                          : "#000000"
                        : isDark
                        ? "#10b981"
                        : "#059669",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>
            {/* Animated underline */}
            <div
              className={`h-2 ${
                isDark ? "bg-white" : "bg-black"
              } mx-auto transition-all duration-1000 ${
                mounted ? "w-32" : "w-0"
              }`}
            ></div>
          </div>{" "}
          {/* Dynamic title with typing skills */}
          <div className="mb-8 sm:mb-12 h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center">
            <div
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light ${
                isDark ? "text-gray-300" : "text-gray-600"
              } ${mounted ? "animate-fade-in-delay-1" : "opacity-0"}`}
            >
              <span>{personalData.title}</span>{" "}
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 h-10 sm:h-12 md:h-14 lg:h-16 flex items-center justify-center">
                <div className="font-mono flex items-center">
                  <span
                    className={`${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    &lt; {displayedSkill}
                  </span>{" "}
                  {showSkillCursor && (
                    <span
                      className={`inline-block w-0.5 h-5 sm:h-6 md:h-7 lg:h-8 ml-1 animate-pulse ${
                        isDark ? "bg-green-400" : "bg-green-600"
                      }`}
                    />
                  )}
                  <span
                    className={`${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {displayedSkill && " />"}
                  </span>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Description */}
          <div
            className={`mb-12 font-mono text-sm md:text-base leading-relaxed max-w-3xl mx-auto transition-opacity duration-1000 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`border rounded-lg p-6 shadow-2xl transition-colors duration-300 ${
                isDark
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <div
                className={`text-xs mb-2 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                // About
              </div>
              <div className={`${isDark ? "text-gray-200" : "text-gray-800"}`}>
                {personalData.description}
              </div>
            </div>
          </div>
          {/* Interactive CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 transition-opacity duration-1000 delay-500 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            {" "}
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="min-w-[200px]"
            >
              Посмотреть работы
            </Button>
            <Button
              href={personalData.telegramUrl}
              variant="outline"
              size="lg"
              external
              className="min-w-[200px]"
            >
              Связаться
            </Button>
          </div>
          {/* Scroll indicator with pulsing effect */}
          <div
            className={`transition-opacity duration-1000 delay-1000 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-px h-16 animate-pulse ${
                  isDark
                    ? "bg-gradient-to-b from-gray-400 to-transparent"
                    : "bg-gradient-to-b from-gray-600 to-transparent"
                }`}
              ></div>
              <div
                className={`text-xs uppercase tracking-widest mt-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Скролл вниз
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
