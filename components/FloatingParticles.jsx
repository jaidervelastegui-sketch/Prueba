function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        duration: 5 + Math.random() * 6,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "999px",
            background: "rgba(255,255,255,0.72)",
            boxShadow: "0 0 18px rgba(255,80,170,0.18)",
          }}
          animate={{
            y: [0, -22, 0],
            x: [0, p.id % 2 === 0 ? 8 : -8, 0],
            opacity: [0.08, 0.55, 0.1],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}