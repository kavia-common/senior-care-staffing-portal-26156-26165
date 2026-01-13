import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
import { Icon } from "../../components/icons/Icons";
import { useAuth } from "../../state/auth";
import { env } from "../../config/env";

/**
 * PUBLIC_INTERFACE
 * LoginPage implements the Auth/Login screen per the figma-pack blueprint.
 */
export default function LoginPage() {
  const { signIn, state } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("jordan.taylor@example.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [bannerError, setBannerError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const canSubmit = useMemo(() => email.trim() && password.trim(), [email, password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBannerError("");
    setEmailError("");
    setPasswordError("");

    // Basic client validation for scaffold
    if (!email.includes("@")) {
      setEmailError("Enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setPasswordError("Password is too short.");
      return;
    }

    try {
      setSubmitting(true);
      await signIn({ email, password });
      // After sign-in, go to role selection (per spec)
      navigate("/roles");
    } catch (err) {
      setBannerError("We couldn’t sign you in. Check your email and password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "640px 1fr" }}>
      {/* Brand panel */}
      <section
        aria-label="Brand panel"
        style={{
          background: "var(--gradient-app-header)",
          padding: "80px",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-3)",
              marginBottom: "var(--space-6)",
            }}
          >
            <div className="sidebarLogoMark" aria-hidden="true">
              SC
            </div>
            <div style={{ fontWeight: 700, fontSize: "var(--type-h3-size)", lineHeight: "var(--type-h3-line)" }}>
              Senior Care Staffing Portal
            </div>
          </div>

          <h1 style={{ margin: 0, fontSize: "var(--type-h2-size)", lineHeight: "var(--type-h2-line)" }}>
            Staffing, compliance, and care operations in one place.
          </h1>

          <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-secondary)", fontSize: "var(--type-body-lg-size)", lineHeight: "var(--type-body-lg-line)" }}>
            Clarity-first dashboards and action-led insights to help teams fill shifts faster and keep residents safe.
          </p>

          <div style={{ marginTop: "var(--space-6)" }} className="helperText">
            Environment (reference only): {env.apiBase || "REACT_APP_API_BASE not set"}
          </div>
        </div>
      </section>

      {/* Auth region */}
      <section
        aria-label="Login"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-8)",
          background: "var(--app-bg)",
        }}
      >
        <div
          className="surface"
          style={{
            width: 420,
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-2)",
            padding: "var(--space-6)",
          }}
        >
          {bannerError ? (
            <div className="banner bannerError" role="alert" style={{ marginBottom: "var(--space-4)" }}>
              <span aria-hidden="true" style={{ color: "var(--color-semantic-error-500)" }}>
                <Icon.X />
              </span>
              <div style={{ fontSize: "var(--type-body-md-size)", lineHeight: "var(--type-body-md-line)" }}>{bannerError}</div>
            </div>
          ) : null}

          <h2 style={{ margin: 0, fontSize: "var(--type-h3-size)", lineHeight: "var(--type-h3-line)" }}>Welcome back</h2>
          <p style={{ marginTop: 6, marginBottom: "var(--space-5)", color: "var(--color-text-secondary)" }}>
            Sign in to manage staffing, compliance, and care.
          </p>

          <form className="formStack" onSubmit={onSubmit}>
            <TextInput
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="name@company.com"
              autoComplete="email"
              disabled={submitting}
              error={emailError}
            />

            <TextInput
              label="Password"
              value={password}
              onChange={setPassword}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={submitting}
              error={passwordError}
              trailingIcon={Icon.ChevronDown}
              onTrailingIconClick={() => setShowPassword((v) => !v)}
            />
            <div className="helperText" style={{ marginTop: -10 }}>
              Tip: use the icon button to toggle password visibility (mock).
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              type="submit"
              loading={submitting}
              disabled={!canSubmit}
              ariaLabel="Sign in"
            >
              Sign in
            </Button>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <button
                type="button"
                onClick={() => window.alert("Forgot password is not in scope yet.")}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  color: "var(--color-text-link)",
                  cursor: "pointer",
                  fontSize: "var(--type-label-md-size)",
                  lineHeight: "var(--type-label-md-line)",
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </button>

              {state.isAuthenticated ? (
                <span className="helperText">Signed in (mock)</span>
              ) : null}
            </div>

            <div className="helperText">Need access? Contact your administrator.</div>
          </form>
        </div>
      </section>

      {/* Responsive: collapse to 1 column on smaller widths */}
      <style>{`
        @media (max-width: 1024px) {
          .loginGrid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
