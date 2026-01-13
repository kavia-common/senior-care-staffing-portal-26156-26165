import React, { useId, useMemo } from "react";

function fieldHeight(size) {
  return size === "lg" ? "var(--control-height-lg)" : "var(--control-height-md)";
}

function fieldPadding(size) {
  return size === "lg" ? "0 14px" : "0 12px";
}

function stateStyles(state) {
  if (state === "disabled") {
    return {
      background: "var(--color-neutral-100)",
      color: "var(--color-text-muted)",
      borderColor: "var(--color-border-default)",
    };
  }
  if (state === "error") {
    return {
      background: "var(--color-brand-surface)",
      color: "var(--color-text-primary)",
      borderColor: "var(--color-semantic-error-500)",
    };
  }
  return {
    background: "var(--color-brand-surface)",
    color: "var(--color-text-primary)",
    borderColor: "var(--color-border-default)",
  };
}

/**
 * PUBLIC_INTERFACE
 * TextInput is a labeled input that follows the figma-pack TextInput sizing and states.
 */
export default function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  helperText,
  error,
  disabled = false,
  size = "md", // md | lg
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  onTrailingIconClick,
  name,
  autoComplete,
  inputMode,
}) {
  const internalId = useId();
  const id = useMemo(() => `ti-${internalId}`, [internalId]);
  const state = disabled ? "disabled" : error ? "error" : "default";

  const inputStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "inherit",
    fontSize: "var(--type-body-md-size)",
    lineHeight: "var(--type-body-md-line)",
    padding: 0,
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)",
    width: "100%",
  };

  const fieldStyle = {
    height: fieldHeight(size),
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    padding: fieldPadding(size),
    borderRadius: "var(--radius-sm)",
    border: `1px solid ${stateStyles(state).borderColor}`,
    background: stateStyles(state).background,
    color: stateStyles(state).color,
    transition: `border-color var(--motion-duration-fast) var(--motion-easing-standard)`,
  };

  return (
    <div style={containerStyle}>
      {label ? (
        <label
          htmlFor={id}
          style={{
            fontSize: "var(--type-label-sm-size)",
            lineHeight: "var(--type-label-sm-line)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-text-primary)",
          }}
        >
          {label}
        </label>
      ) : null}

      <div style={fieldStyle}>
        {LeadingIcon ? (
          <span aria-hidden="true" style={{ display: "inline-flex" }}>
            <LeadingIcon width={18} height={18} />
          </span>
        ) : null}

        <input
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          style={inputStyle}
        />

        {TrailingIcon ? (
          <button
            type="button"
            onClick={onTrailingIconClick}
            disabled={disabled}
            aria-label="Input action"
            style={{
              minWidth: "var(--touch-target-min)",
              minHeight: "var(--touch-target-min)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              background: "transparent",
              color: "inherit",
              cursor: disabled ? "not-allowed" : "pointer",
              borderRadius: 10,
            }}
          >
            <TrailingIcon width={18} height={18} />
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="errorText" style={{ fontSize: "var(--type-caption-size)", lineHeight: "var(--type-caption-line)" }}>
          {error}
        </div>
      ) : helperText ? (
        <div className="helperText">{helperText}</div>
      ) : null}
    </div>
  );
}
