"use client";

import type { Client } from "@/types/cms";
import { Container } from "./ui/Container";
import { SectionReveal } from "./SectionReveal";

export function ClientsGrid({ clients, title }: { clients: Client[]; title?: string }) {
  if (!clients.length) return null;

  return (
    <section className="section-alt section-pad">
      <Container>
        {title && (
          <SectionReveal>
            <h2
              className="font-display mb-12 text-center text-2xl font-medium text-navy sm:text-3xl"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br/>") }}
            />
          </SectionReveal>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => (
            <SectionReveal key={client.id} delay={(i % 9) * 0.03}>
              <div className="rounded-xl border border-border bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm">
                {client.name}
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
