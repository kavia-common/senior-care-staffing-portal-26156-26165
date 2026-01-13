import React from "react";
import AppShell from "../../components/layout/AppShell";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { useToast } from "../../components/ui/Toast";

/**
 * PUBLIC_INTERFACE
 * AdminDashboardPage implements the Community Administrator dashboard per figma-pack blueprint.
 */
export default function AdminDashboardPage() {
  const { showToast } = useToast();

  const kpis = [
    { label: "Staffing coverage today", value: "92%" },
    { label: "Open shifts", value: "7" },
    { label: "Compliance at risk", value: "3" },
    { label: "Overtime hours (7d)", value: "14.5" },
  ];

  const alerts = [
    { title: "2 shifts are uncovered in Memory Care this afternoon.", severity: "warning" },
    { title: "Call-out: RN on Unit B (6pm–10pm).", severity: "error" },
    { title: "CPR certification expires in 10 days (2 staff).", severity: "warning" },
  ];

  const actions = [
    { title: "Offer incentive for 6pm shift", tag: "AI suggestion" },
    { title: "Swap to reduce overtime risk", tag: "AI suggestion" },
    { title: "Message coordinator about coverage gaps", tag: "Suggested" },
  ];

  return (
    <AppShell title="Community overview" breadcrumbs="Dashboards • Community Administrator">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
        <div>
          <div style={{ fontSize: "var(--type-h2-size)", lineHeight: "var(--type-h2-line)", fontWeight: 700 }}>Community overview</div>
          <div className="helperText">Last 7 days • Real-time updates (mock)</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Button
            variant="secondary"
            size="md"
            onClick={() => showToast({ variant: "info", title: "Date range", message: "Date range picker is a mock in this build." })}
          >
            Last 7 days
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() =>
              showToast({
                variant: "success",
                title: "Coverage escalation sent",
                message: "A coverage issue was escalated (mock).",
              })
            }
          >
            Escalate coverage issue
          </Button>
        </div>
      </div>

      <div style={{ height: "var(--space-6)" }} />

      {/* KPI row */}
      <div className="grid gridCols4">
        {kpis.map((k) => (
          <Card key={k.label} variant="kpi" style={{ minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--type-label-md-size)", lineHeight: "var(--type-label-md-line)", fontWeight: 500 }}>
              {k.label}
            </div>
            <div style={{ fontSize: "var(--type-h2-size)", lineHeight: "var(--type-h2-line)", fontWeight: 700 }}>{k.value}</div>
            <div className="helperText">Updated just now</div>
          </Card>
        ))}
      </div>

      <div style={{ height: "var(--space-6)" }} />

      {/* Heatmap card */}
      <Card variant="chart" style={{ minHeight: 360 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-4)" }}>
          <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: 600 }}>Coverage by unit and hour</div>
          <span className="helperText">Hover cells for details (mock)</span>
        </div>

        <div style={{ marginTop: "var(--space-4)", display: "grid", gridTemplateColumns: "repeat(12, 28px)", gap: 6, overflowX: "auto" }}>
          {Array.from({ length: 12 * 6 }).map((_, idx) => {
            const r = Math.floor(idx / 12);
            const c = idx % 12;
            const v = (r * 13 + c * 7) % 100;

            let bg = "var(--color-neutral-100)";
            if (v > 70) bg = "rgba(37, 99, 235, 0.18)";
            if (v > 90) bg = "rgba(37, 99, 235, 0.32)";
            if (v < 12) bg = "rgba(239, 68, 68, 0.22)";

            return (
              <button
                key={idx}
                type="button"
                aria-label={`Heatmap cell ${idx + 1}`}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: "1px solid rgba(0,0,0,0.04)",
                  background: bg,
                  cursor: "pointer",
                }}
                onClick={() =>
                  showToast({
                    variant: "info",
                    title: "Heatmap detail",
                    message: "Memory Care, 2pm–4pm: 1 RN short (mock).",
                  })
                }
              />
            );
          })}
        </div>

        <div style={{ marginTop: "var(--space-4)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
          <div className="helperText">Low</div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 20, height: 10, borderRadius: 999, background: "var(--color-neutral-100)", display: "inline-block" }} />
            <span style={{ width: 20, height: 10, borderRadius: 999, background: "rgba(37, 99, 235, 0.18)", display: "inline-block" }} />
            <span style={{ width: 20, height: 10, borderRadius: 999, background: "rgba(37, 99, 235, 0.32)", display: "inline-block" }} />
          </div>
          <div className="helperText">High</div>
        </div>
      </Card>

      <div style={{ height: "var(--space-6)" }} />

      {/* Alerts & actions */}
      <div className="grid gridCols2">
        <Card style={{ minHeight: 260 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: 600 }}>Urgent alerts</div>
            <Badge variant="warning">{alerts.length} items</Badge>
          </div>

          <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {alerts.map((a, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-3)",
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--app-border)",
                  background: "var(--color-neutral-50)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    marginTop: 6,
                    borderRadius: "999px",
                    background: a.severity === "error" ? "var(--color-semantic-error-500)" : "var(--color-semantic-warning-500)",
                  }}
                />
                <div>
                  <div style={{ fontSize: "var(--type-label-md-size)", lineHeight: "var(--type-label-md-line)", fontWeight: 600 }}>{a.title}</div>
                  <div className="helperText">Open shift board • Review compliance • Message team</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
            <Button variant="secondary" size="sm" onClick={() => showToast({ variant: "info", title: "Open shift board", message: "Shift board is not in scope yet." })}>
              Open shift board
            </Button>
            <Button variant="secondary" size="sm" onClick={() => showToast({ variant: "info", title: "Message coordinator", message: "Messaging is not in scope yet." })}>
              Message staffing coordinator
            </Button>
            <Button variant="secondary" size="sm" onClick={() => showToast({ variant: "info", title: "Compliance", message: "Compliance details are not in scope yet." })}>
              Review compliance issues
            </Button>
          </div>
        </Card>

        <Card style={{ minHeight: 260 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: 600 }}>Suggested actions</div>
            <Badge variant="info">AI</Badge>
          </div>

          <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {actions.map((a, idx) => (
              <div
                key={idx}
                style={{
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--app-border)",
                  background: "var(--color-neutral-50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-3)",
                }}
              >
                <div>
                  <div style={{ fontSize: "var(--type-label-md-size)", lineHeight: "var(--type-label-md-line)", fontWeight: 600 }}>{a.title}</div>
                  <div className="helperText">{a.tag}</div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => showToast({ variant: "success", title: "Action queued", message: "Action has been queued (mock)." })}>
                  Do
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
