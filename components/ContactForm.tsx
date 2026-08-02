"use client";

import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Couldn't send your message. Check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-sm border border-verdigris/40 bg-panel p-8 text-center">
        <p className="font-display text-lg text-ivory">Message received.</p>
        <p className="mt-2 text-sm text-muted">
          Someone from operations will reply within one business day.
        </p>
        <button
          onClick={() => setState("idle")}
          className="btn-outline mt-6 !px-4 !py-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="eyebrow mb-2 block">
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-sm border border-line bg-panel-raised px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold"
          placeholder="Jane Okonkwo"
        />
      </div>
      <div>
        <label htmlFor="email" className="eyebrow mb-2 block">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-line bg-panel-raised px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold"
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="eyebrow mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-sm border border-line bg-panel-raised px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold"
          placeholder="Tell us about your shipment or question…"
        />
      </div>

      {state === "error" && (
        <p className="font-mono text-[12px] text-rust">{error}</p>
      )}

      <button type="submit" disabled={state === "loading"} className="btn-gold disabled:opacity-60">
        {state === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
