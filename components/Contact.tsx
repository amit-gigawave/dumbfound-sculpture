"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      gsap.from(q(".contact-heading > *"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(q(".contact-left"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(q(".contact-right"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(q(".contact-item"), {
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(q(".contact-field"), {
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.to(q(".contact-glow"), {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(q(".contact-panel"), {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.05,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const contactInfo = [
    { icon: MapPin, label: "Address", value: "Mumbai, Maharashtra, India" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210" },
    { icon: Mail, label: "Email", value: "hello@dumbfound.tech" },
    { icon: Clock, label: "Hours", value: "Mon - Sat: 9AM - 6PM" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 min-h-screen py-32 px-6 lg:px-16 pointer-events-none"
    >
      <div className="contact-glow pointer-events-none absolute right-12 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.16),transparent_70%)] blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="contact-heading mb-20 text-center">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.42em] text-white/45">
            Start a Conversation
          </p>
          <h2 className="text-5xl lg:text-7xl font-bold text-center text-white">
            Let&apos;s <span className="text-indigo-400">Create</span> Together
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            The close of the page should feel calm and precise. Contact details
            arrive first, then the form opens in a slower, more confident rhythm.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div className="contact-left space-y-8">
            <p className="text-xl text-zinc-400 leading-relaxed mb-12">
              Have a project in mind? We&apos;d love to hear about it. Reach out and
              let&apos;s bring your vision to life.
            </p>

            {contactInfo.map((item, i) => (
              <div
                key={i}
                className="contact-item flex items-start gap-4 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:border-white/14 hover:bg-white/[0.05]"
              >
                <div className="bg-indigo-500/20 p-3 rounded-lg">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="text-lg text-white">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <div className="contact-right pointer-events-auto">
            <form
              onSubmit={handleSubmit}
              className="contact-panel space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_28px_110px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:p-8"
            >
              <div className="contact-field">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                />
              </div>

              <div className="contact-field">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                />
              </div>

              <div className="contact-field">
                <select
                  value={formData.projectType}
                  onChange={(e) => updateField("projectType", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-indigo-400 transition-colors"
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

              <div className="contact-field">
                <textarea
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400 transition-colors resize-none"
                  required
                />
              </div>

              <div className="contact-field">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-white/38">
                  <span>Response Window</span>
                  <span>Within 48 hours</span>
                </div>
              </div>

              <button
                type="submit"
                className="contact-field w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm hover:scale-[1.02]"
              >
                Start Your Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
