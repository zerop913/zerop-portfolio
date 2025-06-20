import { personalData } from "./personal";

export const terminalCommands = [
  "ivan@portfolio:~$ sudo ./connect-with-developer.sh",
  "Initializing secure connection...",
  "Checking developer availability...",
  "Status: ONLINE ✅",
  "Response time: < 24 hours",
  "Preferred channel: Telegram",
  "Establishing communication protocols...",
  "Connection established! 🚀",
  "",
  "ivan@portfolio:~$ cat contact-info.json",
];

export const jsonOutput = `{
  "name": "${personalData.name}",
  "role": "${personalData.title}",
  "telegram": "${personalData.telegramUrl}",
  "response_time": "fast",
  "availability": "high",
  "ready_for_projects": true
}`;

export const finalCommands = [
  "",
  "ivan@portfolio:~$ echo 'Ready to collaborate!'",
  "Ready to collaborate! Let's build something amazing together!",
];

export const terminalConfig = {
  typingSpeed: 40,
  holdDuration: 3000,
  erasingSpeed: 50,
  pauseBetweenCommands: 500,
  connectionEstablishedIndex: 8,
  jsonAppearDelay: 500,
};
