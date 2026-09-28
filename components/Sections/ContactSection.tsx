"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteContent } from "@/data/content";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Valid email required"),
  roleType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactSection: React.FC = () => {
  const { contact } = siteContent;
  const [serverState, setServerState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerState({ status: "loading", message: "Transmitting message..." });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setServerState({
          status: "success",
          message:
            "Thank you! Your message was sent successfully. Mayank will be in touch shortly.",
        });
        reset();
      } else {
        setServerState({
          status: "error",
          message:
            json.message ||
            "Failed to send. Please write directly to mayanksingh2745@gmail.com",
        });
      }
    } catch (err) {
      setServerState({
        status: "error",
        message:
          "Network error. Please write directly to mayanksingh2745@gmail.com",
      });
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Mayank Singh"
      className="relative min-h-screen w-full flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-12 z-20 pointer-events-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center my-auto">
        {/* Left Column (Desktop: 4 cols): Big Headline & Direct Direct Contact Channels */}
        <div className="lg:col-span-4 flex flex-col space-y-6 z-20">
          <div className="wcag-scrim p-6 -ml-4 rounded-xl">
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#FF5B2E] font-semibold">
              {contact.sectionTag}
            </span>
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#F2EFE8] leading-tight mt-2.5">
              {contact.headline}
            </h2>
            <p className="text-xs sm:text-sm text-[#F2EFE8]/75 mt-4 leading-relaxed font-normal">
              {contact.subheadline}
            </p>
          </div>

          <div className="space-y-2.5">
            <a
              href={`mailto:${contact.email}`}
              className="glass-card p-4 rounded-xl flex items-center justify-between group hover:border-[#FF5B2E]/50 transition-all"
            >
              <div className="font-mono-code text-xs">
                <span className="text-[#F2EFE8]/40 block text-[10px] uppercase">
                  Direct Email
                </span>
                <span className="text-[#F2EFE8] group-hover:text-[#FF5B2E] transition-colors">
                  {contact.email}
                </span>
              </div>
              <span className="text-xs text-[#F2EFE8]/40 group-hover:text-[#FF5B2E]">
                &rarr;
              </span>
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 rounded-xl flex items-center justify-between group hover:border-[#FF5B2E]/50 transition-all"
            >
              <div className="font-mono-code text-xs">
                <span className="text-[#F2EFE8]/40 block text-[10px] uppercase">
                  LinkedIn Professional
                </span>
                <span className="text-[#F2EFE8] group-hover:text-[#FF5B2E] transition-colors">
                  in/mayanksingh2745
                </span>
              </div>
              <span className="text-xs text-[#F2EFE8]/40 group-hover:text-[#FF5B2E]">
                &rarr;
              </span>
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-4 rounded-xl flex items-center justify-between group hover:border-[#FF5B2E]/50 transition-all"
            >
              <div className="font-mono-code text-xs">
                <span className="text-[#F2EFE8]/40 block text-[10px] uppercase">
                  GitHub Code
                </span>
                <span className="text-[#F2EFE8] group-hover:text-[#FF5B2E] transition-colors">
                  github.com/mayanksingh2745
                </span>
              </div>
              <span className="text-xs text-[#F2EFE8]/40 group-hover:text-[#FF5B2E]">
                &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* Center Space for Sticky Avatar (Desktop: 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 h-[65vh] pointer-events-none" />

        {/* Right Column (Desktop: 4 cols): Interactive Form */}
        <div className="lg:col-span-4 z-20">
          <div className="glass-card p-6 sm:p-7 rounded-2xl border border-[#F2EFE8]/15 bg-[#0D0D12]/90 backdrop-blur-xl">
            <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#FF5B2E] mb-4 font-bold">
              Dispatch Transmission
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono-code text-[#F2EFE8]/70 mb-1 uppercase">
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="Your Name / Team"
                  {...register("name")}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0C]/80 border border-[#F2EFE8]/15 text-xs font-mono-code text-[#F2EFE8] placeholder:text-[#F2EFE8]/30 focus:outline-none focus:border-[#FF5B2E] focus:ring-1 focus:ring-[#FF5B2E] transition-colors"
                />
                {errors.name && (
                  <p className="text-[10px] font-mono-code text-red-400 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-[#F2EFE8]/70 mb-1 uppercase">
                  Work Email *
                </label>
                <input
                  type="email"
                  placeholder="recruiter@ai-company.com"
                  {...register("email")}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0C]/80 border border-[#F2EFE8]/15 text-xs font-mono-code text-[#F2EFE8] placeholder:text-[#F2EFE8]/30 focus:outline-none focus:border-[#FF5B2E] focus:ring-1 focus:ring-[#FF5B2E] transition-colors"
                />
                {errors.email && (
                  <p className="text-[10px] font-mono-code text-red-400 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-[#F2EFE8]/70 mb-1 uppercase">
                  Opportunity Type
                </label>
                <select
                  {...register("roleType")}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0C]/80 border border-[#F2EFE8]/15 text-xs font-mono-code text-[#F2EFE8] focus:outline-none focus:border-[#FF5B2E] focus:ring-1 focus:ring-[#FF5B2E] transition-colors"
                >
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Applied ML Engineer">Applied ML Engineer</option>
                  <option value="Forward Deployed Engineer">
                    Forward Deployed Engineer
                  </option>
                  <option value="General Conversation">
                    General Project / Conversation
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-[#F2EFE8]/70 mb-1 uppercase">
                  Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about the challenges and systems you're working on..."
                  {...register("message")}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0C]/80 border border-[#F2EFE8]/15 text-xs font-mono-code text-[#F2EFE8] placeholder:text-[#F2EFE8]/30 focus:outline-none focus:border-[#FF5B2E] focus:ring-1 focus:ring-[#FF5B2E] transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-[10px] font-mono-code text-red-400 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {serverState.status === "error" && (
                <div className="p-2.5 rounded bg-red-950/40 border border-red-500/30 text-[11px] font-mono-code text-red-300">
                  {serverState.message}
                </div>
              )}

              {serverState.status === "success" && (
                <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono-code text-emerald-300">
                  {serverState.message}
                </div>
              )}

              <button
                type="submit"
                disabled={serverState.status === "loading"}
                className="w-full py-3 rounded-lg bg-[#FF5B2E] text-[#0A0A0C] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#FF5B2E]/90 transition-all shadow-lg hover:shadow-[#FF5B2E]/20 focus:outline-none focus:ring-2 focus:ring-[#FF5B2E] disabled:opacity-50"
              >
                {serverState.status === "loading"
                  ? "Transmitting..."
                  : "Send Message &rarr;"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
