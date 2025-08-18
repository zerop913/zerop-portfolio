export interface AuthPageContent {
  ru: {
    title: string;
    subtitle: string;
    backgroundGradient: {
      primary: string;
      secondary: string;
    };
  };
  en: {
    title: string;
    subtitle: string;
    backgroundGradient: {
      primary: string;
      secondary: string;
    };
  };
}

export const loginPageContent: AuthPageContent = {
  ru: {
    title: "С возвращением!",
    subtitle:
      "Войдите в свой аккаунт, чтобы продолжить работу с будущим функционалом",
    backgroundGradient: {
      primary: "from-gray-900/30",
      secondary: "to-black",
    },
  },
  en: {
    title: "Welcome Back!",
    subtitle:
      "Sign in to your account to continue working with upcoming features",
    backgroundGradient: {
      primary: "from-gray-900/30",
      secondary: "to-black",
    },
  },
};

export const registerPageContent: AuthPageContent = {
  ru: {
    title: "Присоединяйтесь к нам!",
    subtitle:
      "Создайте аккаунт, чтобы начать работать с будущим функционалом системы",
    backgroundGradient: {
      primary: "from-gray-900/30",
      secondary: "to-black",
    },
  },
  en: {
    title: "Join Us Today!",
    subtitle: "Create an account to start working with upcoming features",
    backgroundGradient: {
      primary: "from-gray-900/30",
      secondary: "to-black",
    },
  },
};
