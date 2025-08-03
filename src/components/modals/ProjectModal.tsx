"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import { useI18n, getLocalizedText, getLocalizedArray } from "@/lib/i18n";
import { translations } from "@/data/translations";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { language } = useI18n();
  const t = (key: string) =>
    translations[language][key] || translations.ru[key];
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
        >
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-black border border-gray-800 max-w-7xl w-full max-h-[98vh] sm:max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-8 border-b border-gray-800">
              <div className="flex items-end space-x-4 sm:space-x-6">
                <div>
                  <span className="font-mono text-xs sm:text-sm text-gray-500 tracking-wider uppercase block mb-2">
                    {t("projectDetails")} / {project.category}
                  </span>
                  <h2 className="font-grotesk text-xl sm:text-2xl lg:text-3xl font-light text-white">
                    {getLocalizedText(project.title, language)}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-600 hover:border-gray-400 flex items-center justify-center text-gray-400 hover:text-white transition-colors text-lg sm:text-xl font-light"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 h-[calc(98vh-100px)] sm:h-[calc(95vh-140px)]">
              {/* Left Panel - Project Info */}
              <div className="p-4 sm:p-8 overflow-y-auto lg:border-r border-gray-800 flex-1">
                {/* Description */}
                <div className="mb-12">
                  <h3 className="font-grotesk text-xl font-light text-white mb-6">
                    {t("aboutProject")}
                  </h3>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-700 to-transparent"></div>
                    <p className="text-gray-400 leading-relaxed">
                      {getLocalizedText(
                        project.detailedDescription || project.description,
                        language
                      )}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-12">
                  <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-4">
                    {t("technologies")}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 border border-gray-700 hover:border-gray-600 text-gray-300 text-sm font-mono transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                {project.features && (
                  <div className="mb-12">
                    <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-4">
                      {t("keyFeatures")}
                    </span>
                    <div className="space-y-4">
                      {getLocalizedArray(project.features, language).map(
                        (feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                          >
                            <div className="flex items-center justify-between py-3 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                              <div className="flex items-center space-x-4">
                                <span className="font-mono text-sm text-gray-500 w-8">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="text-gray-300">{feature}</span>
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Project Details Grid */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  {project.timeline && (
                    <div className="group">
                      <div className="py-4 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                        <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-2">
                          {t("timeline")}
                        </span>
                        <span className="text-white">
                          {getLocalizedText(project.timeline, language)}
                        </span>
                      </div>
                    </div>
                  )}
                  {project.role && (
                    <div className="group">
                      <div className="py-4 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                        <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-2">
                          {t("role")}
                        </span>
                        <span className="text-white">
                          {getLocalizedText(project.role, language)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="group">
                    <div className="py-4 border-b border-gray-800 group-hover:border-gray-600 transition-all duration-300">
                      <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-2">
                        {t("projectType")}
                      </span>
                      <span className="text-white">
                        {project.isOrder
                          ? t("commercialOrder")
                          : t("personalProject")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                {project.results && (
                  <div className="mb-12">
                    <span className="font-mono text-sm text-gray-500 uppercase tracking-wider block mb-4">
                      {t("results")}
                    </span>
                    <div className="space-y-3">
                      {getLocalizedArray(project.results, language).map(
                        (result, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4"
                          >
                            <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 leading-relaxed">
                              {result}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="space-y-6">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 10 }}
                      className="group flex items-center space-x-4 text-white hover:text-gray-300 transition-colors"
                    >
                      <span className="font-mono text-sm tracking-wider uppercase">
                        {t("openWebsite")}
                      </span>
                      <div className="w-12 h-px bg-white" />
                      <div className="w-1 h-1 bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 10 }}
                      className="group flex items-center space-x-4 text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="font-mono text-sm tracking-wider uppercase">
                        {t("sourceCode")}
                      </span>
                      <div className="w-12 h-px bg-gray-400 group-hover:bg-white transition-colors" />
                      <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Right Panel - Live Preview (Hidden on mobile) */}
              <div className="hidden lg:block p-4 sm:p-8 bg-gray-900/20 flex-1 lg:flex-none">
                {/* Preview Header */}
                <div className="mb-4 sm:mb-6">
                  <span className="font-mono text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                    {t("preview")}
                  </span>
                </div>

                {/* Preview Container */}
                {project.liveUrl ? (
                  <div className="border border-gray-700 bg-white overflow-hidden w-full h-64 sm:h-80 lg:h-full">
                    <iframe
                      src={project.liveUrl}
                      className="w-full h-full"
                      title={`Preview of ${getLocalizedText(
                        project.title,
                        language
                      )}`}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 sm:h-80 lg:h-full border border-gray-700 bg-gray-800/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-600 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-gray-500 text-lg sm:text-2xl">
                          ×
                        </span>
                      </div>
                      <p className="text-gray-500 font-mono text-xs sm:text-sm">
                        {t("previewUnavailable")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
