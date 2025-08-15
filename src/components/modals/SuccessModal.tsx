"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "register";
  userName?: string;
  language: "ru" | "en";
}

const messages = {
  login: {
    ru: {
      title: "Успешный вход",
      subtitle: "Добро пожаловать обратно",
      message: "Вы успешно вошли в свой аккаунт.",
      redirect: "Переходим на главную страницу...",
    },
    en: {
      title: "Login Successful",
      subtitle: "Welcome back",
      message: "You have successfully signed in to your account.",
      redirect: "Redirecting to main page...",
    },
  },
  register: {
    ru: {
      title: "Регистрация завершена",
      subtitle: "Добро пожаловать!",
      message: "Ваш аккаунт успешно создан.",
      redirect: "Переходим на страницу входа...",
    },
    en: {
      title: "Registration Complete",
      subtitle: "Welcome!",
      message: "Your account has been successfully created.",
      redirect: "Redirecting to login page...",
    },
  },
};

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  type,
  userName,
  language,
}) => {
  const content = messages[type][language];

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
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-black border border-gray-800 p-8 relative text-center">
              {/* Декоративные элементы */}
              <div className="absolute top-0 left-0 w-8 h-1 bg-white/20"></div>
              <div className="absolute bottom-0 right-0 w-1 h-8 bg-white/20"></div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1"></div>
                <button
                  onClick={onClose}
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
                  <CheckCircle size={32} className="text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mb-6"
              >
                <h3 className="font-grotesk text-xl text-white mb-2">
                  {content.title}
                </h3>
                <p className="text-gray-400 font-mono text-sm mb-4">
                  {content.subtitle}
                  {type === "login" && userName
                    ? `, ${userName}!`
                    : type === "register" && userName
                    ? `, ${userName}`
                    : "!"}
                </p>
                <p className="text-gray-300 text-sm">{content.message}</p>
              </motion.div>

              {/* Loading Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="border-t border-gray-800 pt-6"
              >
                <div className="flex items-center justify-center space-x-3 text-gray-500 text-sm font-mono mb-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-gray-500 animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                  <span className="ml-2">{content.redirect}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-white"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
