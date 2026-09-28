import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Invalid email address"),
  roleType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, roleType, message } = parsed.data;

    // Check if SMTP or Resend credentials are configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const destinationEmail = process.env.CONTACT_EMAIL || "mayanksingh2745@gmail.com";

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${smtpUser}>`,
        replyTo: email,
        to: destinationEmail,
        subject: `[Portfolio Inquiry] ${name} (${roleType || "Opportunity"})`,
        text: `Name: ${name}\nEmail: ${email}\nRole/Topic: ${roleType || "N/A"}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #111;">
            <h2>New Portfolio Contact Message</h2>
            <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
            <p><strong>Topic / Role:</strong> ${roleType || "General / Role Opportunity"}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        `,
      });
    } else {
      // In development or when no SMTP keys provided, log receipt and succeed gracefully
      console.log("[CONTACT_FORM_SUBMISSION]", {
        timestamp: new Date().toISOString(),
        name,
        email,
        roleType,
        messageLength: message.length,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully. I will get back to you promptly!",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please contact directly at mayanksingh2745@gmail.com" },
      { status: 500 }
    );
  }
}
