"use client";

import dynamic from "next/dynamic";

const ScrollFloat = dynamic(() => import("./ScrollFloat"), { ssr: false });

const team = [
  {
    name: "Ravi Sharma",
    role: "Lead Sculptor",
    description:
      "Leads monument-scale stone work and establishes the physical language of every major commission.",
    accent: "#818cf8",
  },
  {
    name: "Elena Petrov",
    role: "Master Artisan",
    description:
      "Handles casting, finishing, and the small detail decisions that separate a draft from a finished piece.",
    accent: "#f97316",
  },
  {
    name: "Marcus Thorne",
    role: "Creative Director",
    description:
      "Translates brand, site, and architectural context into sculptural systems with a clear visual thesis.",
    accent: "#2dd4bf",
  },
  {
    name: "Ananya Iyer",
    role: "Installation Specialist",
    description:
      "Coordinates logistics, placement, and on-site sequencing so the final reveal feels effortless to the client.",
    accent: "#f472b6",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative z-10 overflow-hidden px-6 py-28 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-4xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-white/42">
            Studio Team
          </p>
          <ScrollFloat
            containerClassName="text-left"
            textClassName="font-display block text-4xl font-semibold uppercase tracking-[-0.05em] text-white sm:text-5xl "
          >
            The People Behind The Weight
          </ScrollFloat>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
            Rather than a dramatic pinned sequence, this rebuild treats the team
            as a panel of specialists. It feels more editorial and pairs better
            with the new gallery interaction.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {team.map((member, index) => (
            <article
              key={member.name}
              className="cursor-target group relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/[0.05] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-45"
                style={{
                  background: `radial-gradient(circle at 18% 18%, ${member.accent}55, transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.14))`,
                }}
              />

              <div className="relative z-10">
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.34em] text-white/38">
                      0{index + 1}
                    </div>
                    <p
                      className="mt-4 text-[11px] uppercase tracking-[0.34em]"
                      style={{ color: member.accent }}
                    >
                      {member.role}
                    </p>
                  </div>
                  <div className="text-[4.5rem] font-display leading-none text-white/12 sm:text-[6rem]">
                    {member.name[0]}
                  </div>
                </div>

                <h3 className="text-3xl font-display text-white">
                  {member.name}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/64">
                  {member.description}
                </p>

                <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/42">
                  <span>Studio presence</span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: member.accent }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
