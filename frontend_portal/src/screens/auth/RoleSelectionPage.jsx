import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Icon } from "../../components/icons/Icons";
import { useAuth } from "../../state/auth";

/**
 * PUBLIC_INTERFACE
 * RoleSelectionPage implements Auth/Role selection per the figma-pack blueprint.
 */
export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const roles = [
    {
      key: "admin",
      title: "Community Administrator",
      desc: "Monitor staffing readiness and compliance at a glance.",
      icon: Icon.Shield,
      badge: "Most used",
      route: "/dashboard/admin",
    },
    {
      key: "scheduler",
      title: "Scheduler / Staffing Coordinator",
      desc: "Build schedules, fill shifts, and resolve call-outs fast.",
      icon: Icon.Calendar,
      route: "/dashboard/scheduler",
    },
    {
      key: "caregiver",
      title: "Caregiver / Nurse",
      desc: "View assignments, complete tasks, and message the team.",
      icon: Icon.Clipboard,
      route: "/dashboard/caregiver",
    },
  ];

  const onChoose = (roleKey, route) => {
    setRole(roleKey);
    navigate(route);
  };

  return (
    <div className="page" style={{ minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "var(--space-8)" }}>
      <div
        className="surface"
        style={{
          width: "min(880px, 100%)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-2)",
          padding: "var(--space-6)",
          marginTop: "8vh",
        }}
      >
        <div style={{ marginBottom: "var(--space-6)" }}>
          <h2 style={{ margin: 0, fontSize: "var(--type-h3-size)", lineHeight: "var(--type-h3-line)" }}>Choose your role</h2>
          <p style={{ marginTop: 6, marginBottom: 0, color: "var(--color-text-secondary)" }}>
            This helps tailor your dashboard and workflow.
          </p>
        </div>

        <div
          className="grid gridCols3"
          style={{
            gap: "var(--space-6)",
          }}
        >
          {roles.map((r) => {
            const IconComp = r.icon;
            return (
              <Card
                key={r.key}
                interactive
                variant="base"
                ariaLabel={`Select role ${r.title}`}
                style={{
                  minHeight: 240,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "var(--radius-md)",
                }}
                onClick={() => onChoose(r.key, r.route)}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-3)" }}>
                    <div
                      aria-hidden="true"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: "var(--color-neutral-100)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconComp />
                    </div>

                    {r.badge ? <Badge variant="neutral">{r.badge}</Badge> : null}
                  </div>

                  <div style={{ marginTop: "var(--space-4)" }}>
                    <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: 600 }}>{r.title}</div>
                    <div style={{ marginTop: 6, color: "var(--color-text-secondary)" }}>{r.desc}</div>
                  </div>
                </div>

                <div style={{ marginTop: "var(--space-6)" }}>
                  <Button variant="primary" size="md" fullWidth onClick={() => onChoose(r.key, r.route)}>
                    Continue
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div style={{ marginTop: "var(--space-6)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{ border: "none", background: "transparent", padding: 0, color: "var(--color-text-link)", cursor: "pointer" }}
          >
            Back to sign in
          </button>
          <span className="helperText">Tip: Use Tab + Enter to select a role.</span>
        </div>
      </div>
    </div>
  );
}
