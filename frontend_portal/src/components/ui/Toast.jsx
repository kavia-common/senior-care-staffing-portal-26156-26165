import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { Icon } from "../icons/Icons";

const ToastContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * ToastProvider provides a simple toast API for the app. Desktop placement is top-right.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const api = useMemo(() => {
    // PUBLIC_INTERFACE
    const showToast = ({ variant = "info", title, message, durationMs = 5000 }) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((prev) => [...prev, { id, variant, title, message }]);

      if (variant !== "error" && durationMs > 0) {
        const t = window.setTimeout(() => {
          setToasts((prev) => prev.filter((x) => x.id !== id));
          timers.current.delete(id);
        }, durationMs);
        timers.current.set(id, t);
      }

      return id;
    };

    // PUBLIC_INTERFACE
    const dismissToast = (id) => {
      const t = timers.current.get(id);
      if (t) window.clearTimeout(t);
      timers.current.delete(id);
      setToasts((prev) => prev.filter((x) => x.id !== id));
    };

    return { showToast, dismissToast };
  }, []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={(id) => api.dismissToast(id)} />
    </ToastContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useToast returns the toast API.
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function iconByVariant(variant) {
  switch (variant) {
    case "success":
      return Icon.Home;
    case "warning":
      return Icon.Shield;
    case "error":
      return Icon.X;
    default:
      return Icon.Bell;
  }
}

function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      aria-live="polite"
      aria-relevant="additions removals"
      style={{
        position: "fixed",
        top: "var(--space-4)",
        right: "var(--space-4)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        zIndex: 60,
        width: 360,
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const IconComp = iconByVariant(toast.variant);

  return (
    <div
      className="surface"
      role="status"
      style={{
        padding: "var(--space-4)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-2)",
        display: "grid",
        gridTemplateColumns: "20px 1fr 44px",
        gap: "var(--space-3)",
        alignItems: "start",
      }}
    >
      <span aria-hidden="true" style={{ color: "var(--color-text-secondary)" }}>
        <IconComp />
      </span>

      <div>
        <div style={{ fontSize: "var(--type-label-md-size)", lineHeight: "var(--type-label-md-line)", fontWeight: "var(--font-weight-medium)" }}>
          {toast.title}
        </div>
        {toast.message ? (
          <div style={{ marginTop: 2, fontSize: "var(--type-body-md-size)", lineHeight: "var(--type-body-md-line)", color: "var(--color-text-secondary)" }}>
            {toast.message}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
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
  );
}
