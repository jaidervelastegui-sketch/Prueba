"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function InteractiveCard({
  children,
  href,
  style,
  delay = 0,
  target = "_blank",
  rel = "noreferrer",
  featured = false,
}) {
  const [glow, setGlow] = useState({
    x: "50%",
    y: "50%",
    visible: 0,
  });

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.52, delay }}
      whileHover={{ y: -9, scale: featured ? 1.02 : 1.015 }}
      whileTap={{ scale: 0.988 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setGlow({
          x: `${e.clientX - rect.left}px`,
          y: `${e.clientY - rect.top}px`,
          visible: 1,
        });
      }}
      onMouseEnter={() => setGlow((g) => ({ ...g, visible: 1 }))}
      onMouseLeave={() => setGlow((g) => ({ ...g, visible: 0 }))}
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: glow.visible,
          transition: "opacity 0.28s ease",
          pointerEvents: "none",
          background: featured
            ? `radial-gradient(260px circle at ${glow.x} ${glow.y}, rgba(255,80,170,0.20), transparent 42%)`
            : `radial-gradient(220px circle at ${glow.x} ${glow.y}, rgba(255,255,255,0.10), transparent 40%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          boxShadow: glow.visible
            ? featured
              ? "inset 0 0 0 1px rgba(255,110,190,0.22), 0 24px 70px rgba(255,90,170,0.14)"
              : "inset 0 0 0 1px rgba(255,255,255,0.14), 0 24px 70px rgba(255,255,255,0.06)"
            : featured
            ? "inset 0 0 0 1px rgba(255,90,170,0.18)"
            : "inset 0 0 0 1px rgba(255,255,255,0.02)",
          transition: "all 0.28s ease",
          pointerEvents: "none",
        }}
      />
      {featured && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(255,80,170,0.06), transparent 36%, rgba(80,220,255,0.05) 100%)",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </motion.a>
  );
}