import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Aurum Transit",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl leading-tight text-ivory md:text-5xl">
            Questions about a shipment, or a route we don&apos;t cover yet?
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            For active shipments, the fastest answer is usually the tracking
            page. For anything else — new routes, insurance queries, or
            partnership requests — send a message and operations will follow
            up directly.
          </p>

          <dl className="mt-10 space-y-6 border-t border-line pt-8">
            <div>
              <dt className="eyebrow mb-1">Operations</dt>
              <dd className="text-sm text-ivory">ops@aurumtransit.example</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Registered Office</dt>
              <dd className="text-sm text-ivory">
                27 Bond Street, London, W1S 2BQ, United Kingdom
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Hours</dt>
              <dd className="text-sm text-ivory">Mon–Fri, 08:00–18:00 GMT</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-sm border border-line bg-panel p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
