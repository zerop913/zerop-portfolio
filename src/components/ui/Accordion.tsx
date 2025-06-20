"use client";

import { useState } from "react";

interface AccordionProps {
  items: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

export default function Accordion({ items }: AccordionProps) {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex justify-between items-center"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {item.question}
            </span>
            <span
              className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ease-in-out ${
                openItem === item.id ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>{" "}
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              openItem === item.id
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
