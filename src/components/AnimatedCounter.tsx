"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
  className,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  const formatted =
    end >= 1000 ? count.toLocaleString("en-IN") : count.toString();

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
