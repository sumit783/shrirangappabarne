"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { offices } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function Contact() {
  const { t, lang } = useT();
  const items = offices[lang];
  const [form, setForm] = useState({ name: "", mobile: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.message.trim()) {
      toast.error(lang === "mr" ? "कृपया आवश्यक फील्ड भरा" : "Please fill required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone_number: form.mobile.trim(),
          email: form.email.trim() || null,
          subject: form.subject.trim() || null,
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      toast.success(lang === "mr" ? "संदेश यशस्वीरित्या पाठवला!" : "Message sent successfully!");
      setForm({ name: "", mobile: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(lang === "mr" ? "संदेश पाठवण्यात त्रुटी आली." : "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 container-x">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block bg-saffron/10 text-saffron px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
          {t("nav.contact")}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-navy mt-4">{t("contact.title")}</h2>
        <p className="mt-4 text-muted-foreground">{t("contact.subtitle")}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {items.map((o, i) => (
          <motion.div
            key={o.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border rounded-2xl p-7 hover:border-saffron hover:shadow-elegant transition"
          >
            <h3 className="text-xl font-bold text-navy">{o.name}</h3>
            <div className="mt-4 space-y-3 text-sm">
              <p className="flex gap-3">
                <MapPin className="h-5 w-5 text-saffron flex-shrink-0" />
                {o.addr}
              </p>
              <p className="flex gap-3">
                <Phone className="h-5 w-5 text-saffron flex-shrink-0" />
                {o.phone}
              </p>
              <p className="flex gap-3">
                <Mail className="h-5 w-5 text-saffron flex-shrink-0" />
                {o.email}
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(o.addr)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-saffron font-semibold text-sm hover:gap-3 transition-all"
            >
              {t("contact.map")} →
            </a>
          </motion.div>
        ))}
      </div>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 bg-card border rounded-3xl p-8 md:p-12 shadow-elegant max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-navy">{t("contact.form")}</h3>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <input
            suppressHydrationWarning
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t("contact.name")}
            maxLength={100}
            className="rounded-xl border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron"
            disabled={submitting}
          />
          <input
            suppressHydrationWarning
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            placeholder={t("contact.mobile")}
            maxLength={15}
            className="rounded-xl border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron"
            disabled={submitting}
          />
          <input
            suppressHydrationWarning
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={t("contact.email")}
            maxLength={255}
            className="rounded-xl border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron"
            disabled={submitting}
          />
          <input
            suppressHydrationWarning
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder={t("contact.subject")}
            maxLength={150}
            className="rounded-xl border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron"
            disabled={submitting}
          />
        </div>
        <textarea
          suppressHydrationWarning
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={t("contact.message")}
          rows={5}
          maxLength={1000}
          className="mt-4 w-full rounded-xl border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron"
          disabled={submitting}
        />
        <button
          suppressHydrationWarning
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex items-center gap-2 bg-gradient-saffron text-white px-8 py-3.5 rounded-full font-semibold shadow-saffron hover:scale-105 transition disabled:opacity-50 disabled:pointer-events-none"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {t("contact.send")}
        </button>
      </motion.form>
    </section>
  );
}
