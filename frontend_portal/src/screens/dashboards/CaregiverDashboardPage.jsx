import React from "react";
import AppShell from "../../components/layout/AppShell";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { useToast } from "../../components/ui/Toast";

/**
 * PUBLIC_INTERFACE
 * CaregiverDashboardPage implements the Caregiver/Nurse Today dashboard with tablet-friendly behavior.
 */
export default function CaregiverDashboardPage() {
  const { showToast } = useToast();

  const assignments = [
    { time: "8:00", unit: "Memory Care", group: "Group A", tasks: "Vitals, meds pass, rounding", new: true },
    { time: "10:30", unit: "Unit A", group: "Group C", tasks: "ADL assist, charting", new: false },
    { time: "13:00", unit: "Skilled Nursing", group: "Group B", tasks: "Wound check, notes", new: false },
    { time: "15:30", unit: "Unit B", group: "Group D", tasks: "Transfer assist, safety checks", new: false },
  ];

  return (
    <AppShell title="Today" breadcrumbs="Dashboards • Caregiver / Nurse">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: "var(--type-h2-size)", lineHeight: "var(--type-h2-line)", fontWeight: 700 }}>Today</div>
          <div className="helperText">Thursday • Next shift and assignments (mock)</div>
        </div>

        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Button variant="secondary" size="md" onClick={() => showToast({ variant: "info", title: "Message", message: "Messaging is not in scope yet." })}>
            Message
          </Button>
          <Button variant="secondary" size="md" onClick={() => showToast({ variant: "info", title: "Request swap", message: "Swap flow is not in scope yet." })}>
            Request swap
          </Button>
          <Button variant="primary" size="md" onClick={() => showToast({ variant: "info", title: "Schedule", message: "Schedule view is not in scope yet." })}>
            View schedule
          </Button>
        </div>
      </div>

      <div style={{ height: "var(--space-6)" }} />

      {/* Next shift card */}
      <Card variant="insight" style={{ minHeight: 160, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap" }}>
        <div style={{ minWidth: 260 }}>
          <div style={{ fontSize: "var(--type-h3-size)", lineHeight: "var(--type-h3-line)", fontWeight: 700 }}>Next shift: 7:00–3:00</div>
          <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <Badge variant="info">CNA</Badge>
            <span style={{ color: "var(--color-text-secondary)" }}>Memory Care</span>
          </div>
          <div className="helperText" style={{ marginTop: 6 }}>
            Arrive 10 minutes early • Bring badge + PPE
          </div>
        </div>

        <Button variant="secondary" size="md" onClick={() => showToast({ variant: "info", title: "Shift details", message: "Shift details view is not in scope yet." })}>
          View details
        </Button>
      </Card>

      <div style={{ height: "var(--space-6)" }} />

      {/* Two-column desktop, stacked tablet */}
      <div className="grid gridCols2" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <Card style={{ minHeight: 420 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: 600 }}>Assignments</div>
            <Badge variant="info">4</Badge>
          </div>

          <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {assignments.map((a, idx) => (
              <div
                key={idx}
                style={{
                  padding: "var(--space-3)",
                  border: "1px solid var(--app-border)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-neutral-50)",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "var(--space-3)",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 700 }}>{a.time}</div>
                    <div style={{ fontWeight: 600 }}>{a.unit}</div>
                    {a.new ? <Badge variant="info">New</Badge> : null}
                  </div>
                  <div className="helperText">
                    {a.group} • {a.tasks}
                  </div>
                </div>

                <Button variant="secondary" size="sm" onClick={() => showToast({ variant: "success", title: "Marked complete", message: "Task marked complete (mock)." })}>
                  Complete
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <Card style={{ minHeight: 200 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: 600 }}>Compliance reminders</div>
              <Badge variant="warning">1</Badge>
            </div>

            <div style={{ marginTop: "var(--space-4)", padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--app-border)", background: "var(--color-neutral-50)" }}>
              <div style={{ fontWeight: 600 }}>Credential expires in 10 days: CPR</div>
              <div className="helperText">Upload renewal documentation to stay compliant.</div>
            </div>

            <div style={{ marginTop: "var(--space-4)" }}>
              <Button variant="primary" size="md" fullWidth onClick={() => showToast({ variant: "info", title: "Upload renewal", message: "Upload flow is not in scope yet." })}>
                Upload renewal
              </Button>
            </div>
          </Card>

          <Card style={{ minHeight: 200 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: 600 }}>Messages</div>
              <Badge variant="info">2 unread</Badge>
            </div>

            <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {[
                { from: "Coordinator", text: "Can you cover Unit B at 6pm?", unread: true },
                { from: "Charge Nurse", text: "Reminder: document vitals by end of shift.", unread: true },
                { from: "Scheduler", text: "Thanks for confirming tomorrow’s shift.", unread: false },
              ].map((m, idx) => (
                <div key={idx} style={{ padding: "var(--space-3)", borderRadius: "var(--radius-md)", border: "1px solid var(--app-border)", background: "var(--color-neutral-50)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontWeight: 600 }}>{m.from}</div>
                    {m.unread ? <Badge variant="info" size="sm">Unread</Badge> : null}
                  </div>
                  <div className="helperText" style={{ marginTop: 2 }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "var(--space-4)" }}>
              <Button variant="secondary" size="md" fullWidth onClick={() => showToast({ variant: "info", title: "Open messages", message: "Messaging UI is not in scope yet." })}>
                Open messages
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        /* Tablet-friendly layout: stack the right column under assignments */
        @media (max-width: 1024px) {
          .gridCols2[style*="2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
