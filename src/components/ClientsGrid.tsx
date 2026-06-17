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
              className="mb-12 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br/>") }}
            />
          </SectionReveal>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => (
            <SectionReveal key={client.id} delay={(i % 9) * 0.03}>
              <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 text-sm font-medium text-gray-700 shadow-sm">
                {client.name}
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
