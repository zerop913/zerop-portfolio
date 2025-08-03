"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { personalData } from "@/data/personal";
import { ProjectModal } from "@/components/modals/ProjectModal";
import { useI18n, getLocalizedText } from "@/lib/i18n";
import { useElementTracking } from "@/components/analytics/AnalyticsTracker";

export const ProjectsSection: React.FC = () => {
  const { language } = useI18n();
  const { trackClick, trackHover } = useElementTracking();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    // Трекинг клика по проекту
    trackClick("project", `project_${project.id}`, {
      category: project.category,
      title: project.title,
      technologies: project.technologies,
    });

    // Проверяем размер экрана - на мобильных не открываем модальное окно
    if (window.innerWidth < 1024) {
      // lg breakpoint
      // На мобильных открываем ссылку на проект, если она есть
      if (project.liveUrl) {
        trackClick("external_link", "project_live_url", project.liveUrl);
        window.open(project.liveUrl, "_blank");
      }
      return;
    }

    // На десктопе открываем модальное окно
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    trackClick("filter", `category_${category.toLowerCase()}`);
    setSelectedCategory(category);
  };

  const handleProjectHover = (projectId: number, isEntering: boolean) => {
    if (isEntering) {
      setHoveredProject(projectId);
      const hoverStartTime = Date.now();

      // Устанавливаем таймер для отслеживания длительного наведения
      setTimeout(() => {
        if (hoveredProject === projectId) {
          const hoverDuration = Date.now() - hoverStartTime;
          trackHover(`project_${projectId}`, hoverDuration);
        }
      }, 2000);
    } else {
      setHoveredProject(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const getCategoryName = (category: string) => {
    if (category === "All") {
      return language === "en" ? "All" : "Все";
    }
    return category; // Остальные категории остаются на английском
  };
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 sm:py-32 bg-black relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-40 right-0 w-px h-40 bg-gradient-to-b from-white/10 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
            <div>
              <span className="font-mono text-xs sm:text-sm text-gray-500 tracking-wider uppercase">
                03 / {language === "en" ? "Projects" : "Проекты"}
              </span>
              <div className="relative mt-4">
                <h2 className="font-grotesk text-3xl sm:text-4xl lg:text-6xl font-light text-white relative z-10">
                  {language === "en" ? "My Work" : "Мои работы"}
                </h2>
                {/* Тонкое свечение для лучшей видимости */}
                <div className="absolute inset-0 font-grotesk text-3xl sm:text-4xl lg:text-6xl font-light text-white/10 blur-sm">
                  {language === "en" ? "My Work" : "Мои работы"}
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 text-left sm:text-right">
              <div className="font-mono text-xs text-gray-500 mb-2">
                {language === "en"
                  ? "Projects Completed"
                  : "Проектов завершено"}
              </div>
              <div className="font-mono text-xl sm:text-2xl text-white">
                {projects.length}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 border font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? "border-white text-white bg-white/5"
                  : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300"
              }`}
            >
              {getCategoryName(category)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                onHoverStart={() => handleProjectHover(project.id, true)}
                onHoverEnd={() => handleProjectHover(project.id, false)}
                onClick={() => handleProjectClick(project)}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Project Number & Category */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <span className="font-mono text-xs sm:text-sm text-gray-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {project.isOrder && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 border border-blue-600 bg-blue-600/10 text-blue-400 font-mono text-xs uppercase tracking-wider"
                      >
                        {language === "en" ? "Order" : "Заказ"}
                      </motion.span>
                    )}
                    {/* Индикатор внешней ссылки на мобильных */}
                    {project.liveUrl && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                        className="lg:hidden px-1.5 py-0.5 border border-gray-600 bg-gray-600/10 text-gray-400 font-mono text-xs"
                      >
                        ↗
                      </motion.span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-gray-600 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Project Content - Flex grow для одинаковой высоты */}
                <div className="flex flex-col flex-grow">
                  {/* Project Title */}
                  <motion.h3
                    className="font-grotesk text-xl sm:text-2xl lg:text-3xl font-light mb-3 sm:mb-4 text-white group-hover:text-gray-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {getLocalizedText(project.title, language)}
                  </motion.h3>

                  {/* Project Description */}
                  <p className="text-gray-400 leading-relaxed mb-6 sm:mb-8 group-hover:text-gray-300 transition-colors flex-grow text-sm sm:text-base">
                    {getLocalizedText(project.description, language)}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + techIndex * 0.02,
                        }}
                        className="px-2 sm:px-3 py-1 border border-gray-700 group-hover:border-gray-600 font-mono text-xs text-gray-400 group-hover:text-gray-300 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0 mt-auto">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="group/link flex items-center space-x-3 text-white hover:text-gray-300 transition-colors"
                      >
                        <span className="font-mono text-xs sm:text-sm tracking-wider">
                          {language === "en" ? "Visit" : "Посетить"}
                        </span>
                        <motion.div
                          className="w-6 sm:w-8 h-px bg-white group-hover/link:w-8 sm:group-hover/link:w-12 transition-all duration-300"
                          whileHover={{ scaleX: 1.5 }}
                        />
                        <div className="w-1 h-1 bg-white rounded-full" />
                      </motion.a>
                    )}

                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="group/link flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="font-mono text-xs sm:text-sm tracking-wider">
                          {language === "en" ? "Code" : "Код"}
                        </span>
                        <motion.div className="w-4 sm:w-6 h-px bg-gray-400 group-hover/link:bg-white group-hover/link:w-6 sm:group-hover/link:w-8 transition-all duration-300" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover Indicator */}
                <motion.div
                  className="mt-8 w-full h-px bg-gray-800 group-hover:bg-gray-600 transition-colors"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    className="h-full bg-white origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 pt-16 border-t border-gray-800"
        >
          <div className="max-w-2xl mx-auto">
            {/* Section header */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-8 h-px bg-gray-600"></div>
                <span className="font-mono text-sm text-gray-500 tracking-wider uppercase">
                  {language === "en"
                    ? "Ready to collaborate"
                    : "Готов к сотрудничеству"}
                </span>
              </div>
              <h3 className="font-grotesk text-3xl sm:text-4xl font-light text-white mb-6">
                {language === "en"
                  ? "Interested in collaboration?"
                  : "Заинтересованы в сотрудничестве?"}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {language === "en"
                  ? "Ready to discuss your project and offer optimal solutions for your business."
                  : "Готов обсудить ваш проект и предложить оптимальные решения для вашего бизнеса."}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a
                href="#contact"
                whileHover={{ x: 10 }}
                className="group flex items-center space-x-4 text-white hover:text-gray-300 transition-colors"
              >
                <span className="font-mono text-sm tracking-wider uppercase">
                  {language === "en" ? "Discuss project" : "Обсудить проект"}
                </span>
                <div className="w-12 h-px bg-white" />
                <div className="w-1 h-1 bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
              </motion.a>

              <motion.a
                href={personalData.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="group flex items-center space-x-4 text-gray-400 hover:text-white transition-colors"
              >
                <span className="font-mono text-sm tracking-wider uppercase">
                  {language === "en" ? "Contact now" : "Написать сейчас"}
                </span>
                <div className="w-10 h-px bg-gray-400 group-hover:bg-white transition-colors" />
                <div className="w-1 h-1 bg-gray-400 group-hover:bg-white rounded-full group-hover:rotate-45 group-hover:rounded-none group-hover:scale-110 transition-all duration-300" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Modal - Only on desktop */}
      <div className="hidden lg:block">
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  );
};
