import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";

interface CommercialProjectEmailProps {
  name: string;
  email: string;
  company?: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
  language: "ru" | "en";
}

const budgetLabels = {
  ru: {
    "under-50k": "До 50 000 ₽",
    "50k-100k": "50 000 - 100 000 ₽",
    "100k-250k": "100 000 - 250 000 ₽",
    "250k-500k": "250 000 - 500 000 ₽",
    "500k-1m": "500 000 - 1 000 000 ₽",
    "over-1m": "Свыше 1 000 000 ₽",
    discuss: "Обсуждается",
  },
  en: {
    "under-2k": "Under $2,000",
    "2k-5k": "$2,000 - $5,000",
    "5k-10k": "$5,000 - $10,000",
    "10k-25k": "$10,000 - $25,000",
    "25k-50k": "$25,000 - $50,000",
    "over-50k": "Over $50,000",
    discuss: "To be discussed",
  },
};

const timelineLabels = {
  ru: {
    urgent: "Срочно (до 1 недели)",
    "1-2weeks": "1-2 недели",
    "1month": "1 месяц",
    "2-3months": "2-3 месяца",
    "3-6months": "3-6 месяцев",
    "6months+": "Более 6 месяцев",
    flexible: "Гибкие сроки",
  },
  en: {
    urgent: "Urgent (within 1 week)",
    "1-2weeks": "1-2 weeks",
    "1month": "1 month",
    "2-3months": "2-3 months",
    "3-6months": "3-6 months",
    "6months+": "More than 6 months",
    flexible: "Flexible timeline",
  },
};

const content = {
  ru: {
    subject: "Новая заявка на коммерческий проект",
    greeting: "Поступила новая заявка на коммерческий проект:",
    clientInfo: "Информация о клиенте:",
    projectInfo: "Детали проекта:",
    name: "Имя",
    email: "Email",
    company: "Компания",
    description: "Описание проекта",
    budget: "Бюджет",
    timeline: "Сроки",
    footer: "Это автоматическое сообщение с сайта ivan-smolin.ru",
    reply: "Ответить клиенту",
  },
  en: {
    subject: "New Commercial Project Request",
    greeting: "A new commercial project request has been received:",
    clientInfo: "Client Information:",
    projectInfo: "Project Details:",
    name: "Name",
    email: "Email",
    company: "Company",
    description: "Project Description",
    budget: "Budget",
    timeline: "Timeline",
    footer: "This is an automated message from ivan-smolin.ru",
    reply: "Reply to client",
  },
};

export const CommercialProjectEmail: React.FC<CommercialProjectEmailProps> = ({
  name,
  email,
  company,
  projectDescription,
  budget,
  timeline,
  language = "en",
}) => {
  const t = content[language];
  const budgetLabel = budget
    ? (budgetLabels[language] as any)[budget] || budget
    : "";
  const timelineLabel = timeline
    ? (timelineLabels[language] as any)[timeline] || timeline
    : "";

  return (
    <Html>
      <Head />
      <Preview>{t.subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={title}>Ivan Smolin</Text>
            <Text style={subtitle}>Web Developer</Text>
          </Section>

          <Hr style={hr} />

          {/* Main Content */}
          <Section>
            <Heading style={h1}>{t.greeting}</Heading>

            {/* Client Information */}
            <Section style={section}>
              <Heading style={h2}>{t.clientInfo}</Heading>
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.name}:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{name}</Text>
                </Column>
              </Row>
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.email}:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Link href={`mailto:${email}`} style={emailLink}>
                    {email}
                  </Link>
                </Column>
              </Row>
              {company && (
                <Row style={infoRow}>
                  <Column style={labelColumn}>
                    <Text style={label}>{t.company}:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{company}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Project Information */}
            <Section style={section}>
              <Heading style={h2}>{t.projectInfo}</Heading>
              <Row style={infoRow}>
                <Column>
                  <Text style={label}>{t.description}:</Text>
                  <Text style={descriptionText}>{projectDescription}</Text>
                </Column>
              </Row>
              {budget && (
                <Row style={infoRow}>
                  <Column style={labelColumn}>
                    <Text style={label}>{t.budget}:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{budgetLabel}</Text>
                  </Column>
                </Row>
              )}
              {timeline && (
                <Row style={infoRow}>
                  <Column style={labelColumn}>
                    <Text style={label}>{t.timeline}:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{timelineLabel}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Action Button */}
            <Section style={buttonSection}>
              <Link
                href={`mailto:${email}?subject=${language === "ru" ? "Re: Ваша заявка на коммерческий проект" : "Re: Your commercial project request"}`}
                style={button}
              >
                {t.reply}
              </Link>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>{t.footer}</Text>
            <Text style={footerText}>projects@ivan-smolin.ru</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#000000",
  fontFamily:
    'ui-monospace, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  backgroundColor: "#000000",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const title = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "300",
  margin: "0",
  lineHeight: "1.4",
};

const subtitle = {
  color: "#9ca3af",
  fontSize: "14px",
  margin: "8px 0 0 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
};

const h1 = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "300",
  margin: "0 0 24px 0",
  lineHeight: "1.4",
};

const h2 = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "300",
  margin: "0 0 16px 0",
  lineHeight: "1.4",
  borderBottom: "1px solid #374151",
  paddingBottom: "8px",
};

const section = {
  marginBottom: "32px",
};

const infoRow = {
  marginBottom: "12px",
};

const labelColumn = {
  width: "120px",
  verticalAlign: "top" as const,
};

const valueColumn = {
  verticalAlign: "top" as const,
};

const label = {
  color: "#9ca3af",
  fontSize: "12px",
  margin: "0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const value = {
  color: "#ffffff",
  fontSize: "14px",
  margin: "0",
  lineHeight: "1.5",
};

const emailLink = {
  color: "#ffffff",
  fontSize: "14px",
  textDecoration: "underline",
  margin: "0",
  lineHeight: "1.5",
};

const descriptionText = {
  color: "#ffffff",
  fontSize: "14px",
  margin: "8px 0 0 0",
  lineHeight: "1.6",
  padding: "16px",
  backgroundColor: "#111111",
  border: "1px solid #374151",
  whiteSpace: "pre-wrap" as const,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#ffffff",
  color: "#000000",
  padding: "12px 32px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "400",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  border: "1px solid #ffffff",
  display: "inline-block",
};

const hr = {
  borderColor: "#374151",
  margin: "32px 0",
};

const footer = {
  textAlign: "center" as const,
};

const footerText = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "4px 0",
  lineHeight: "1.4",
};
