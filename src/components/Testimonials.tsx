"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow",
    content:
      "Anish transformed our brand identity completely. The attention to detail and creative vision exceeded all expectations.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Founder",
    company: "StartupX",
    content:
      "Working with Anish was a game-changer. Our conversion rates increased by 40% after the redesign.",
    rating: 5,
    avatar: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "DesignCo",
    content:
      "The UI/UX work was phenomenal. Users love the new interface and engagement metrics are through the roof.",
    rating: 5,
    avatar: "ER",
  },
  {
    name: "David Kim",
    role: "CEO",
    company: "InnovateLab",
    content:
      "Exceptional poster designs that captured our brand essence perfectly.",
    rating: 5,
    avatar: "DK",
  },
  {
    name: "Lisa Thompson",
    role: "Creative Director",
    company: "MediaPro",
    content:
      "The logo design process was collaborative and the final result was beyond what we imagined.",
    rating: 5,
    avatar: "LT",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const next = () => {
    setActiveIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const t = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="relative min-h-screen w-full flex items-center justify-center bg-background"
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span className="text-[13vw] font-bold select-none">
          TESTIMONIALS
        </span>
      </div>

      <div className="relative z-10 max-w-2xl w-full px-6 text-center">
        {/* Stars */}
        <div className="flex justify-center mb-6 gap-1">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 fill-primary text-primary"
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="mb-8 transition-all duration-300">
          <p className="text-2xl md:text-3xl font-medium leading-relaxed italic">
            “{t.content}”
          </p>
        </blockquote>

        {/* Author */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold border border-primary/30">
            {t.avatar}
          </div>
          <div>
            <p className="font-bold text-lg">{t.name}</p>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">
              {t.role} • {t.company}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="p-3 rounded-full border border-border hover:bg-primary/10 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full border border-border hover:bg-primary/10 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
