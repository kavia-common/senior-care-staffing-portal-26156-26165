import React, { useEffect } from "react";
import { Icon } from "../icons/Icons";

/**
 * PUBLIC_INTERFACE
 * Drawer renders a right-side inspector panel with overlay.
 * - Desktop width: 420; Tablet width: 360.
 * - Escape closes; overlay click closes.
 */
export default function Drawer({ open, title, size = "desktop", onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const width = size === "tablet" ? 360 : 420;

  return (
    <div
      aria-hidden={!open}
      style={{
        pointerEvents: open ? "auto" : "none",
        position: "fixed",
        inset: 0,
        zIndex: 50,
      }}
    >
      <div
        onClick={() => onClose?.()}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(17, 24, 39, 0.45)",
          opacity: open ? 1 : 0,
          transition: `opacity var(--motion-duration-slow) var(--motion-easing-standard)`,
        }}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width,
          background: "var(--app-surface)",
          borderLeft: "1px solid var(--app-border)",
          boxShadow: "var(--shadow-3)",
          transform: open ? "translateX(0)" : `translateX(${width}px)`,
          transition: `transform var(--motion-duration-slow) var(--motion-easing-standard)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "var(--space-4)",
            borderBottom: "1px solid var(--app-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-3)",
          }}
        >
          <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: "var(--font-weight-semibold)" }}>
            {title}
          </div>

          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close drawer"
            style={{
              border: "none",
              background: "transparent",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
              minWidth: "var(--touch-target-min)",
              minHeight: "var(--touch-target-min)",
              borderRadius: 10,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon.X />
          </button>
        </div>

        <div style={{ padding: "var(--space-4)", overflow: "auto" }}>{children}</div>
      </aside>
    </div>
  );
}
