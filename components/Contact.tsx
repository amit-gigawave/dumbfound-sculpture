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
    const ctx = gsap.context(() => {
      gsap.from(".contact-left", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".contact-right", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
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
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl lg:text-7xl font-bold text-center mb-20 text-white">
          Let's <span className="text-indigo-400">Create</span> Together
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div className="contact-left space-y-8">
            <p className="text-xl text-zinc-400 leading-relaxed mb-12">
              Have a project in mind? We'd love to hear about it. Reach out and
              let's bring your vision to life.
            </p>

            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                />
              </div>

              <div>
                <select
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
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

              <div>
                <textarea
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400 transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm hover:scale-[1.02]"
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
