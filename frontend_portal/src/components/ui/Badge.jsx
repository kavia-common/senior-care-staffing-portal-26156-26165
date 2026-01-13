import React from "react";

function variantStyles(variant) {
  switch (variant) {
    case "info":
      return { bg: "rgba(37, 99, 235, 0.10)", fg: "var(--color-brand-primary-600)" };
    case "warning":
      return { bg: "rgba(245, 158, 11, 0.18)", fg: "#92400E" };
    case "error":
      return { bg: "rgba(239, 68, 68, 0.12)", fg: "var(--color-semantic-error-500)" };
    case "success":
      return { bg: "rgba(22, 163, 74, 0.12)", fg: "var(--color-semantic-success-600)" };
    default:
      return { bg: "var(--color-neutral-100)", fg: "var(--color-text-secondary)" };
  }
}

/**
 * PUBLIC_INTERFACE
 * Badge renders compact status/count labels per the figma-pack spec.
 */
export default function Badge({ variant = "neutral", size = "sm", children }) {
  const v = variantStyles(variant);

  const height = size === "md" ? 24 : 20;
  const padding = size === "md" ? "0 10px" : "0 8px";

  return (
    <span
      style={{
        height,
        padding,
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "var(--radius-round)",
        background: v.bg,
        color: v.fg,
        fontSize: "var(--type-label-sm-size)",
        lineHeight: "var(--type-label-sm-line)",
        fontWeight: "var(--font-weight-medium)",
        border: "1px solid rgba(0,0,0,0.03)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
