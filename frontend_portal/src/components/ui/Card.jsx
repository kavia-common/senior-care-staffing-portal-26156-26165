import React from "react";

function paddingByVariant(variant) {
  if (variant === "chart") return "var(--space-4)";
  if (variant === "kpi") return "var(--space-4)";
  return "var(--space-4)";
}

/**
 * PUBLIC_INTERFACE
 * Card is a styled surface container aligned with the figma-pack Card spec.
 */
export default function Card({ variant = "base", interactive = false, children, style, onClick, ariaLabel }) {
  return (
    <div
      className={interactive ? "surface surfaceInteractive" : "surface"}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        padding: paddingByVariant(variant),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
