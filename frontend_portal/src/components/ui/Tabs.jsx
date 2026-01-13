import React from "react";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * PUBLIC_INTERFACE
 * Tabs renders a simple tablist with keyboard navigation.
 */
export default function Tabs({ variant = "underline", tabs, activeKey, onChange }) {
  const containerStyle =
    variant === "pill"
      ? { background: "var(--color-neutral-100)", borderRadius: "var(--radius-round)", padding: 4, display: "inline-flex", gap: 4 }
      : { display: "inline-flex", gap: "var(--space-2)" };

  return (
    <div role="tablist" aria-label="Tabs" style={containerStyle}>
      {tabs.map((t) => {
        const active = t.key === activeKey;
        return (
          <button
            key={t.key}
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            className={cx("tabButton")}
            onClick={() => onChange?.(t.key)}
            onKeyDown={(e) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
              e.preventDefault();
              const idx = tabs.findIndex((x) => x.key === activeKey);
              let nextIdx = idx;
              if (e.key === "ArrowLeft") nextIdx = Math.max(0, idx - 1);
              if (e.key === "ArrowRight") nextIdx = Math.min(tabs.length - 1, idx + 1);
              if (e.key === "Home") nextIdx = 0;
              if (e.key === "End") nextIdx = tabs.length - 1;
              onChange?.(tabs[nextIdx].key);
            }}
            style={{
              height: "40px",
              padding: "0 12px",
              border: "none",
              background: variant === "pill" ? (active ? "var(--color-brand-primary-600)" : "transparent") : "transparent",
              color: variant === "pill" ? (active ? "var(--color-text-on-primary)" : "var(--color-text-secondary)") : active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              borderBottom: variant === "underline" ? (active ? "2px solid var(--color-brand-primary-600)" : "2px solid transparent") : "none",
              fontSize: "var(--type-label-md-size)",
              lineHeight: "var(--type-label-md-line)",
              fontWeight: "var(--font-weight-medium)",
              borderRadius: variant === "pill" ? "var(--radius-round)" : 10,
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
