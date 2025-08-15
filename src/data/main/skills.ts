export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
    ],
  },
  {
    title: "Backend",
    skills: [
      "PHP",
      "Python",
      "Node.js",
      "API Development",
      "REST API",
      "Database Design",
    ],
  },
  {
    title: "Tools & Other",
    skills: ["Bot Development", "Database Management", "Git/GitHub", "Docker"],
  },
];

// Функция для получения всех навыков в виде плоского массива
export const getAllSkills = (): string[] => {
  return skillsData.flatMap((category) => category.skills);
};

// Функция для получения топ навыков для hero секции
export const getTopSkills = (count: number = 4): string[] => {
  const allSkills = getAllSkills();
  return allSkills.slice(0, count);
};

// Объект для обратной совместимости с существующим кодом
export const skillCategories = skillsData.reduce((acc, category) => {
  acc[category.title] = category.skills;
  return acc;
}, {} as Record<string, string[]>);
