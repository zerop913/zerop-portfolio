import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import React from "react";
import { CommercialProjectEmail } from "@/components/emails/CommercialProjectEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      projectDescription,
      budget,
      timeline,
      language,
    } = body;

    // Валидация обязательных полей
    if (!name || !email || !projectDescription) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Отправка email
    const { data, error } = await resend.emails.send({
      from: "Commercial Request <noreply@ivan-smolin.ru>",
      to: ["projects@ivan-smolin.ru"],
      replyTo: email,
      subject: `${language === "en" ? "New Commercial Project Request" : "Новая заявка на коммерческий проект"} - ${name}`,
      react: React.createElement(CommercialProjectEmail, {
        name,
        email,
        company,
        projectDescription,
        budget,
        timeline,
        language: language || "en",
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
