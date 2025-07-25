"use client";

import { projects } from "@/data/projects";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Projects = () => {
  const { isVisible, ref } = useScrollAnimation();
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const getCurrentProjects = () => {
    const startIndex = currentPage * projectsPerPage;
    return projects.slice(startIndex, startIndex + projectsPerPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const codeLines = [
    "// projects.config.ts",
    "import { ProjectInterface } from '@/types'",
    "",
    "export const featuredProjects: ProjectInterface[] = [",
  ];

  return (
    <section
      ref={ref}
      id="projects"
      className={`py-20 transition-all duration-700 ${
        isDark ? "bg-gray-900" : "bg-white"
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Editor Header */}
        <div
          className={`rounded-t-lg border-b ${
            isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span
                className={`text-sm font-mono ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                projects.tsx
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isLoading ? "bg-yellow-500 animate-pulse" : "bg-green-500"
                }`}
              ></div>
              <span
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {isLoading ? "Loading..." : "Ready"}
              </span>
            </div>
          </div>
        </div>

        {/* Code Editor Content */}
        <div
          className={`${
            isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
          } rounded-b-lg border-l border-r border-b ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {/* Line Numbers & Code */}
          <div className="flex">
            <div
              className={`${
                isDark
                  ? "bg-gray-800 text-gray-500"
                  : "bg-gray-50 text-gray-400"
              } py-6 px-4 font-mono text-sm select-none border-r ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              {codeLines.map((_, index) => (
                <div key={index} className="leading-6">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
              ))}
              {getCurrentProjects().map((_, index) => (
                <div key={index + codeLines.length} className="leading-6">
                  {(index + codeLines.length + 1).toString().padStart(2, "0")}
                </div>
              ))}
              <div className="leading-6">
                {(getCurrentProjects().length + codeLines.length + 1)
                  .toString()
                  .padStart(2, "0")}
              </div>
            </div>

            <div className="flex-1 py-6 px-6">
              {/* Code Header */}
              <div className="font-mono text-sm mb-6 space-y-1">
                <div
                  className={`${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  // projects.config.ts
                </div>
                <div>
                  <span
                    className={`${
                      isDark ? "text-purple-400" : "text-purple-600"
                    }`}
                  >
                    import
                  </span>
                  <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                    {" "}
                    {"{"} ProjectInterface {"}"}{" "}
                  </span>
                  <span
                    className={`${
                      isDark ? "text-purple-400" : "text-purple-600"
                    }`}
                  >
                    from
                  </span>
                  <span
                    className={`${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {" "}
                    '@/types'
                  </span>
                </div>
                <div></div>
                <div>
                  <span
                    className={`${
                      isDark ? "text-purple-400" : "text-purple-600"
                    }`}
                  >
                    export
                  </span>
                  <span
                    className={`${isDark ? "text-blue-400" : "text-blue-600"}`}
                  >
                    {" "}
                    const
                  </span>
                  <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                    {" "}
                    featuredProjects
                  </span>
                  <span
                    className={`${
                      isDark ? "text-yellow-400" : "text-yellow-600"
                    }`}
                  >
                    :
                  </span>
                  <span
                    className={`${isDark ? "text-blue-400" : "text-blue-600"}`}
                  >
                    {" "}
                    ProjectInterface
                  </span>
                  <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                    [] = [
                  </span>
                </div>
              </div>{" "}
              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {getCurrentProjects().map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.03,
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`h-full group cursor-pointer transition-all duration-300 relative ${
                        isDark
                          ? "bg-gray-800 border-gray-600 hover:border-green-400 hover:shadow-xl hover:shadow-green-400/20"
                          : "bg-white border-gray-300 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/20"
                      }`}
                    >
                      {/* Order Badge */}
                      {project.isOrder && (
                        <div className="absolute top-4 right-4 z-10">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isDark
                                ? "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white"
                                : "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white"
                            } shadow-lg`}
                          >
                            ORDER
                          </div>
                        </div>
                      )}

                      <div className="p-6 h-full flex flex-col">
                        {/* Project Object Header */}
                        <div className="font-mono text-sm mb-4">
                          <div
                            className={`${
                              isDark ? "text-gray-500" : "text-gray-400"
                            } mb-1`}
                          >
                            // Project #{project.id.toString().padStart(2, "0")}
                          </div>
                          <div
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {"{"}
                            <br />
                            <span className="ml-4">
                              <span
                                className={`${
                                  isDark ? "text-blue-400" : "text-blue-600"
                                }`}
                              >
                                title
                              </span>
                              <span
                                className={`${
                                  isDark ? "text-yellow-400" : "text-yellow-600"
                                }`}
                              >
                                :
                              </span>
                              <span
                                className={`${
                                  isDark ? "text-green-400" : "text-green-600"
                                }`}
                              >
                                {" "}
                                "{project.title[language]}"
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-300" : "text-gray-700"
                                }
                              >
                                ,
                              </span>
                            </span>
                          </div>
                        </div>{" "}
                        <h3
                          className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                            isDark
                              ? "text-gray-100 group-hover:text-green-300"
                              : "text-gray-900 group-hover:text-green-600"
                          }`}
                        >
                          {project.title[language]}
                        </h3>
                        <p
                          className={`${
                            isDark ? "text-gray-200" : "text-gray-600"
                          } mb-4 flex-grow leading-relaxed group-hover:${
                            isDark ? "text-gray-100" : "text-gray-700"
                          } transition-colors duration-300`}
                        >
                          {project.description[language]}
                        </p>
                        {/* Technologies */}
                        <div className="mb-4">
                          <div
                            className={`font-mono text-xs mb-2 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            tech_stack: [
                          </div>
                          <div className="flex flex-wrap gap-2 ml-4">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className={`px-3 py-1 text-xs font-mono rounded-md transition-all duration-300 ${
                                  isDark
                                    ? "bg-gray-700 text-green-200 border border-gray-600 group-hover:bg-green-900/30 group-hover:border-green-400 group-hover:text-green-100"
                                    : "bg-green-50 text-green-700 border border-green-200 group-hover:bg-green-100 group-hover:border-green-300"
                                }`}
                              >
                                "{tech}"
                              </span>
                            ))}
                          </div>
                          <div
                            className={`font-mono text-xs mt-2 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            ]
                          </div>
                        </div>{" "}
                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2 mt-auto">
                          {project.liveUrl && (
                            <Button
                              variant="primary"
                              size="sm"
                              className="w-full"
                              onClick={() =>
                                window.open(project.liveUrl, "_blank")
                              }
                            >
                              demo()
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="w-full"
                              onClick={() =>
                                window.open(project.githubUrl, "_blank")
                              }
                            >
                              github()
                            </Button>
                          )}
                        </div>
                        {/* Closing Bracket */}
                        <div
                          className={`font-mono text-sm mt-4 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {"}"},{" "}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white disabled:bg-gray-800 disabled:text-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 disabled:bg-gray-50 disabled:text-gray-300"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>

                  <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i === currentPage
                            ? isDark
                              ? "bg-green-400"
                              : "bg-green-500"
                            : isDark
                            ? "bg-gray-600 hover:bg-gray-500"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white disabled:bg-gray-800 disabled:text-gray-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 disabled:bg-gray-50 disabled:text-gray-300"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
              {/* Code Footer */}
              <div
                className={`font-mono text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                ];
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div
            className={`${
              isDark
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-gray-50 border-gray-200 text-gray-600"
            } px-4 py-2 text-xs font-mono flex justify-between items-center border-t rounded-b-lg`}
          >
            <div className="flex items-center space-x-4">
              <span>TypeScript React</span>
              <span>UTF-8</span>
              <span>LF</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Prettier</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>
                Ln {getCurrentProjects().length + codeLines.length + 1}, Col 2
              </span>
              <span>
                {projects.length} projects total | Page {currentPage + 1} of{" "}
                {totalPages}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
