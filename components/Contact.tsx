"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import BorderGlow from "./BorderGlow";

const GradualBlur = dynamic(() => import("./GradualBlur"), { ssr: false });
const ScrollFloat = dynamic(() => import("./ScrollFloat"), { ssr: false });

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const contactInfo = [
    { icon: MapPin, label: "Address", value: "Mumbai, Maharashtra, India" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210" },
    { icon: Mail, label: "Email", value: "hello@dumbfound.tech" },
    { icon: Clock, label: "Hours", value: "Mon - Sat: 9AM - 6PM" },
  ];

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section
      id="contact"
      className="relative z-10 overflow-hidden px-6 py-28 lg:px-16"
    >


      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-4xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-white/42">
            Contact
          </p>
          <ScrollFloat
            containerClassName="text-left"
            textClassName="font-display block text-4xl font-semibold uppercase tracking-[-0.05em] text-white sm:text-5xl "
          >
            Build The Next Landmark
          </ScrollFloat>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
            The closing section should feel assured, not generic. It keeps the
            same glass-and-atmosphere language while giving the client a very
            clear next move.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="grid gap-4">
            {contactInfo.map((item) => (
              <BorderGlow
                key={item.label}
                className="cursor-target overflow-hidden border-white/10"
                backgroundColor="#090312"
                borderRadius={28}
                glowRadius={28}
                edgeSensitivity={58}
                coneSpread={20}
                glowIntensity={0.9}
                colors={["#f4f0e8", "#8ea4ff", "#62d4c8"]}
                forceHover
                forceHoverAngle={315}
                forceHoverProximity={1}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <item.icon className="h-5 w-5 text-white/74" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                        {item.label}
                      </div>
                      <div className="mt-2 text-base text-white/82">
                        {item.value}
                      </div>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            ))}

            <BorderGlow
              className="overflow-hidden border-white/10"
              backgroundColor="#090312"
              borderRadius={28}
              glowRadius={28}
              edgeSensitivity={58}
              coneSpread={20}
              glowIntensity={0.9}
              colors={["#ffe1f4", "#ff8d76", "#f4f0e8"]}
              forceHover
              forceHoverAngle={315}
              forceHoverProximity={1}
            >
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-[0.34em] text-white/42">
                  Typical response window
                </div>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  We usually reply within 48 hours with an initial direction,
                  project questions, and a recommended next step.
                </p>
              </div>
            </BorderGlow>
          </div>

          <BorderGlow
            className="overflow-hidden border-white/10"
            backgroundColor="#090312"
            borderRadius={38}
            glowRadius={34}
            edgeSensitivity={56}
            coneSpread={22}
            glowIntensity={1}
            colors={["#d7f2ff", "#8ea4ff", "#f4f0e8"]}
            forceHover
            forceHoverAngle={315}
            forceHoverProximity={1}
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 shadow-[0_28px_100px_rgba(0,0,0,0.3)] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="cursor-target w-full rounded-[1.2rem] border border-white/10 bg-black/18 px-5 py-4 text-white placeholder:text-white/36 focus:border-white/24 focus:outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="cursor-target w-full rounded-[1.2rem] border border-white/10 bg-black/18 px-5 py-4 text-white placeholder:text-white/36 focus:border-white/24 focus:outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <select
                    value={formData.projectType}
                    onChange={(e) => updateField("projectType", e.target.value)}
                    className="cursor-target w-full rounded-[1.2rem] border border-white/10 bg-black/18 px-5 py-4 text-white focus:border-white/24 focus:outline-none"
                    required
                  >
                    <option value="" disabled>
                      Project Type
                    </option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="public">Public Space</option>
                    <option value="custom">Custom Commission</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <textarea
                    placeholder="Tell us about your project"
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    rows={7}
                    className="cursor-target w-full resize-none rounded-[1.4rem] border border-white/10 bg-black/18 px-5 py-4 text-white placeholder:text-white/36 focus:border-white/24 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                  Share references, dimensions, or site notes if available
                </p>
                <button
                  type="submit"
                  className="cursor-target inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Start the Project
                </button>
              </div>
            </form>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
