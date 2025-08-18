"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  User,
  Building,
  FileText,
  Send,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { commercialProjectContent } from "@/data/main/commercial";

interface CommercialProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: "ru" | "en";
}

interface FormData {
  name: string;
  email: string;
  company: string;
  projectDescription: string;
  budget: string;
  timeline: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectDescription?: string;
  general?: string;
}

export const CommercialProjectModal: React.FC<CommercialProjectModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectDescription: "",
    budget: "",
    timeline: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = commercialProjectContent[language];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = content.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = content.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = content.validation.emailInvalid;
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = content.validation.descriptionRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/send-commercial-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send request");
      }

      setIsSubmitted(true);

      // Автоматически закрыть модальное окно через 3 секунды
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      setErrors({
        general:
          error instanceof Error ? error.message : content.errors.general,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      projectDescription: "",
      budget: "",
      timeline: "",
    });
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Success Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-1/2 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 transform -translate-y-1/2 z-50 w-auto max-w-md mx-auto"
            >
              <div className="bg-black border border-gray-800 p-6 sm:p-8 relative text-center">
                {/* Декоративные элементы */}
                <div className="absolute top-0 left-0 w-8 h-1 bg-white/20"></div>
                <div className="absolute bottom-0 right-0 w-1 h-8 bg-white/20"></div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1"></div>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 border border-gray-600 bg-gray-900/50 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-white">
                    {content.success.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {content.success.message}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {content.success.autoClose}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-1/2 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 transform -translate-y-1/2 z-50 w-auto max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-black border border-gray-800 p-6 sm:p-8 relative">
              {/* Декоративные элементы */}
              <div className="absolute top-0 left-0 w-8 h-1 bg-white/20"></div>
              <div className="absolute bottom-0 right-0 w-1 h-8 bg-white/20"></div>

              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-gray-600 bg-gray-900/50 flex items-center justify-center">
                    <Building className="w-4 h-4 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-light text-white">
                    {content.title}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {content.description}
                </p>
                <div className="mt-4 flex items-center space-x-2 text-xs text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>projects@ivan-smolin.ru</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && <ErrorBox message={errors.general} />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      type="text"
                      label={content.form.name}
                      placeholder={content.form.name}
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      error={errors.name}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      label={content.form.email}
                      placeholder={content.form.email}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      error={errors.email}
                      required
                    />
                  </div>
                </div>

                <Input
                  type="text"
                  label={content.form.company}
                  placeholder={content.form.company}
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />

                <div>
                  <label className="block font-mono text-sm text-gray-300 mb-2">
                    {content.form.projectDescription} *
                  </label>
                  <textarea
                    placeholder={content.form.projectDescription}
                    value={formData.projectDescription}
                    onChange={(e) =>
                      handleInputChange("projectDescription", e.target.value)
                    }
                    rows={4}
                    className={`w-full bg-gray-900/50 border ${
                      errors.projectDescription
                        ? "border-red-500"
                        : "border-gray-800"
                    } px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none ${
                      errors.projectDescription
                        ? "focus:border-red-400"
                        : "focus:border-gray-600"
                    } transition-colors resize-none font-mono`}
                    required
                  />
                  {errors.projectDescription && (
                    <p className="mt-2 text-red-400 text-xs">
                      {errors.projectDescription}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-sm text-gray-300 mb-2">
                      {content.form.budget}
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                      className="w-full bg-gray-900/50 border border-gray-800 focus:border-gray-600 px-4 py-3 text-white text-sm focus:outline-none transition-colors font-mono appearance-none cursor-pointer pr-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 12px center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "16px",
                      }}
                    >
                      <option value="" className="bg-gray-900 text-white">
                        {content.form.budget}
                      </option>
                      {content.form.budgetOptions.map(
                        (option: { value: string; label: string }) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="bg-gray-900 text-white"
                          >
                            {option.label}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-sm text-gray-300 mb-2">
                      {content.form.timeline}
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) =>
                        handleInputChange("timeline", e.target.value)
                      }
                      className="w-full bg-gray-900/50 border border-gray-800 focus:border-gray-600 px-4 py-3 text-white text-sm focus:outline-none transition-colors font-mono appearance-none cursor-pointer pr-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 12px center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "16px",
                      }}
                    >
                      <option value="" className="bg-gray-900 text-white">
                        {content.form.timeline}
                      </option>
                      {content.form.timelineOptions.map(
                        (option: { value: string; label: string }) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="bg-gray-900 text-white"
                          >
                            {option.label}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden bg-white text-black hover:bg-gray-100 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                          />
                          <span>{content.form.sending}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          <span>{content.form.submit}</span>
                        </>
                      )}
                    </span>
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  {language === "ru" ? (
                    <>
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white underline transition-colors"
                      >
                        Политикой конфиденциальности
                      </a>
                      ,{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white underline transition-colors"
                      >
                        Пользовательским соглашением
                      </a>{" "}
                      и{" "}
                      <a
                        href="/offer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white underline transition-colors"
                      >
                        Договором-офертой
                      </a>
                    </>
                  ) : (
                    <>
                      By clicking the button, you agree to{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white underline transition-colors"
                      >
                        Privacy Policy
                      </a>
                      ,{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white underline transition-colors"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/offer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white underline transition-colors"
                      >
                        Offer Agreement
                      </a>
                    </>
                  )}
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
