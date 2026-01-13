import React from "react";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function sizeStyles(size) {
  if (size === "sm") return { height: "var(--control-height-sm)", padding: "0 12px", borderRadius: "var(--radius-sm)" };
  if (size === "lg") return { height: "var(--control-height-lg)", padding: "0 18px", borderRadius: "10px" };
  return { height: "var(--control-height-md)", padding: "0 16px", borderRadius: "var(--radius-sm)" };
}

function styleColors(variant, state) {
  const pressed = state === "pressed";
  if (variant === "primary") {
    return {
      background: pressed
        ? "var(--color-action-primary-bg-pressed)"
        : "var(--color-action-primary-bg-default)",
      color: "var(--color-action-primary-fg)",
      border: "1px solid transparent",
    };
  }
  if (variant === "danger") {
    return {
      background: "var(--color-action-danger-bg-default)",
      color: "var(--color-action-danger-fg)",
      border: "1px solid transparent",
    };
  }
  if (variant === "ghost") {
    return {
      background: "transparent",
      color: "var(--color-text-primary)",
      border: "1px solid transparent",
    };
  }
  if (variant === "link") {
    return {
      background: "transparent",
      color: "var(--color-text-link)",
      border: "1px solid transparent",
    };
  }
  // secondary
  return {
    background: "var(--color-action-secondary-bg-default)",
    color: "var(--color-action-secondary-fg)",
    border: "1px solid var(--color-action-secondary-border)",
  };
}

function hoverStyles(variant) {
  if (variant === "primary") return { background: "var(--color-action-primary-bg-hover)" };
  if (variant === "danger") return { background: "var(--color-action-danger-bg-hover)" };
  if (variant === "secondary") return { background: "var(--color-action-secondary-bg-hover)" };
  if (variant === "ghost") return { background: "var(--color-neutral-100)" };
  if (variant === "link") return { textDecoration: "underline" };
  return {};
}

/**
 * PUBLIC_INTERFACE
 * Button implements the Figma-pack button spec (sizes, variants, focus ring, loading/disabled).
 */
export default function Button({
  variant = "primary", // primary | secondary | ghost | danger | link
  size = "md", // sm | md | lg
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = "button",
  ariaLabel,
}) {
  const isDisabled = disabled || loading;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    minWidth: "var(--control-minWidth-button, 88px)",
    fontSize: size === "sm" ? "var(--type-label-sm-size)" : "var(--type-label-md-size)",
    lineHeight: size === "sm" ? "var(--type-label-sm-line)" : "var(--type-label-md-line)",
    fontWeight: "var(--font-weight-medium)",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.6 : 1,
    transition: `transform var(--motion-duration-fast) var(--motion-easing-standard),
      box-shadow var(--motion-duration-fast) var(--motion-easing-standard),
      background var(--motion-duration-fast) var(--motion-easing-standard),
      border-color var(--motion-duration-fast) var(--motion-easing-standard)`,
    width: fullWidth ? "100%" : "auto",
    userSelect: "none",
  };

  const visual = {
    ...sizeStyles(size),
    ...styleColors(variant, "default"),
  };

  return (
    <button
      type={type}
      className={cx("uiButton")}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      style={Object.assign({}, base, visual)}
      onMouseEnter={(e) => {
        if (isDisabled) return;
        Object.assign(e.currentTarget.style, hoverStyles(variant));
        if (variant !== "link") e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, visual);
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.textDecoration = "none";
      }}
    >
      <span style={{ display: "inline-flex", width: 20, justifyContent: "center" }}>
        {loading ? (
          <Spinner size={size === "lg" ? 20 : 16} />
        ) : LeadingIcon ? (
          <LeadingIcon width={20} height={20} />
        ) : null}
      </span>

      <span>{children}</span>

      <span style={{ display: "inline-flex", width: 20, justifyContent: "center" }}>
        {TrailingIcon ? <TrailingIcon width={20} height={20} /> : null}
      </span>
    </button>
  );
}

function Spinner({ size = 16 }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      style={{
        width: size,
        height: size,
        borderRadius: "999px",
        border: "2px solid rgba(255,255,255,0.5)",
        borderTopColor: "rgba(255,255,255,1)",
        display: "inline-block",
        animation: "spin 900ms linear infinite",
      }}
    />
  );
}

/* Add a keyframes rule inline by injecting a style tag once. */
if (typeof document !== "undefined") {
  const id = "ui-spinner-keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }";
    document.head.appendChild(style);
  }
}
