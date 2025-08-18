export type Language = "ru" | "en";

export interface AuthTranslations {
  ru: {
    [key: string]: string;
  };
  en: {
    [key: string]: string;
  };
}

export const authTranslations: AuthTranslations = {
  ru: {
    // Общие
    email: "Email",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    name: "Имя",
    username: "Логин",
    loading: "Загрузка...",
    cancel: "Отмена",
    back: "Назад",

    // Форма входа
    loginTitle: "Вход в систему",
    loginSubtitle: "Добро пожаловать! Войдите в свой аккаунт",
    loginButton: "Войти",
    loginSuccess: "Успешный вход!",
    loginSuccessMessage: "Добро пожаловать, {name}! Перенаправляем вас...",
    noAccount: "Нет аккаунта?",
    createAccount: "Создать аккаунт",
    forgotPassword: "Забыли пароль?",

    // Форма регистрации
    registerTitle: "Регистрация",
    registerSubtitle: "Создайте новый аккаунт",
    registerButton: "Зарегистрироваться",
    registerSuccess: "Регистрация успешна!",
    registerSuccessMessage: "Добро пожаловать, {name}! Ваш аккаунт создан.",
    haveAccount: "Уже есть аккаунт?",
    signIn: "Войти",

    // Политика конфиденциальности
    agreeToPolicy: "Я согласен с",
    privacyPolicy: "Политикой конфиденциальности",
    termsOfService: "Условиями использования",
    and: "и",

    // Требования к паролю
    passwordRequirements: "Требования к паролю:",
    passwordMinLength: "Минимум 8 символов",
    passwordUppercase: "Содержит заглавные буквы",
    passwordLowercase: "Содержит строчные буквы",
    passwordNumber: "Содержит цифры",
    passwordSpecial: "Содержит специальные символы",

    // Ошибки валидации
    required: "Обязательно для заполнения",
    invalidEmail: "Неверный формат email",
    passwordMismatch: "Пароли не совпадают",
    weakPassword: "Пароль не соответствует требованиям",
    mustAgreeToPolicy: "Необходимо согласиться с политикой конфиденциальности",

    // Ошибки сервера
    emailExists: "Пользователь с таким email уже существует",
    usernameExists: "Пользователь с таким логином уже существует",
    userNotFound: "Пользователь не найден",
    invalidCredentials: "Неверный email или пароль",
    serverError: "Произошла ошибка на сервере. Попробуйте еще раз.",
    networkError: "Ошибка подключения. Проверьте интернет-соединение.",
  },
  en: {
    // Common
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Name",
    username: "Username",
    loading: "Loading...",
    cancel: "Cancel",
    back: "Back",

    // Login form
    loginTitle: "Sign In",
    loginSubtitle: "Welcome back! Please sign in to your account",
    loginButton: "Sign In",
    loginSuccess: "Login Successful!",
    loginSuccessMessage: "Welcome back, {name}! Redirecting you...",
    noAccount: "Don't have an account?",
    createAccount: "Create Account",
    forgotPassword: "Forgot Password?",

    // Register form
    registerTitle: "Create Account",
    registerSubtitle: "Sign up for a new account",
    registerButton: "Create Account",
    registerSuccess: "Registration Successful!",
    registerSuccessMessage: "Welcome, {name}! Your account has been created.",
    haveAccount: "Already have an account?",
    signIn: "Sign In",

    // Privacy policy
    agreeToPolicy: "I agree to the",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    and: "and",

    // Password requirements
    passwordRequirements: "Password requirements:",
    passwordMinLength: "At least 8 characters",
    passwordUppercase: "Contains uppercase letters",
    passwordLowercase: "Contains lowercase letters",
    passwordNumber: "Contains numbers",
    passwordSpecial: "Contains special characters",

    // Validation errors
    required: "This field is required",
    invalidEmail: "Invalid email format",
    passwordMismatch: "Passwords do not match",
    weakPassword: "Password does not meet requirements",
    mustAgreeToPolicy: "You must agree to the privacy policy",

    // Server errors
    emailExists: "User with this email already exists",
    usernameExists: "User with this username already exists",
    userNotFound: "User not found",
    invalidCredentials: "Invalid email or password",
    serverError: "Server error occurred. Please try again.",
    networkError: "Network error. Please check your internet connection.",
  },
};

// Хелпер для получения переводов с подстановкой параметров
export const getAuthTranslation = (
  key: string,
  language: Language,
  params?: { [key: string]: string }
): string => {
  let translation =
    authTranslations[language][key] || authTranslations.ru[key] || key;

  if (params) {
    Object.keys(params).forEach((param) => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
  }

  return translation;
};
