function formatFollowers(value) {
  if (value == null) return "--";
  return new Intl.NumberFormat("es-EC").format(value);
}

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};


function RollingDigit({ char }) {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const isDigit = /\d/.test(char);

  if (!isDigit) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: char === "." ? "0.38em" : "0.55em",
        }}
      >
        {char}
      </span>
    );
  }

  const index = digits.indexOf(char);

  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        width: "0.68em",
        height: "1em",
        overflow: "hidden",
      }}
    >
      <motion.span
        animate={{ y: `-${index}em` }}
        transition={{
          type: "spring",
          stiffness: 170,
          damping: 20,
          mass: 0.8,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1,
          color: "#ff5aaa",
        }}
      >
        {digits.map((d) => (
          <span
            key={d}
            style={{
              height: "1em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function RollingCounter({ value }) {
  const formatted = formatFollowers(value);

  return (
    <span
      aria-label={formatted}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.02em",
      }}
    >
      {formatted.split("").map((char, i) => (
        <RollingDigit key={`${char}-${i}`} char={char} />
      ))}
    </span>
  );
}

