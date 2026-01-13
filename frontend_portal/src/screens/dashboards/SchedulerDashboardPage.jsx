import React, { useMemo, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
import Tabs from "../../components/ui/Tabs";
import Badge from "../../components/ui/Badge";
import Drawer from "../../components/ui/Drawer";
import { Icon } from "../../components/icons/Icons";
import { useToast } from "../../components/ui/Toast";

/**
 * PUBLIC_INTERFACE
 * SchedulerDashboardPage implements the Scheduler/Staffing Coordinator dashboard per figma-pack blueprint.
 */
export default function SchedulerDashboardPage() {
  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("day");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tabs = useMemo(
    () => [
      { key: "day", label: "Day" },
      { key: "week", label: "Week" },
      { key: "open", label: "Open shifts" },
    ],
    []
  );

  const ops = [
    { label: "Call-outs", value: "2", variant: "warning" },
    { label: "Unassigned shifts", value: "5", variant: "warning" },
    { label: "Requests to swap", value: "3", variant: "info" },
  ];

  const shiftCards = useMemo(() => {
    const base = [
      { time: "7:00–3:00", unit: "Memory Care", role: "CNA", status: "Unfilled", risk: "warning" },
      { time: "8:00–4:00", unit: "Unit A", role: "RN", status: "Filled", risk: "ok" },
      { time: "2:00–10:00", unit: "Unit B", role: "LPN", status: "Unfilled", risk: "error" },
      { time: "6:00–10:00", unit: "Unit B", role: "RN", status: "Unfilled", risk: "error" },
      { time: "10:00–6:00", unit: "Skilled Nursing", role: "CNA", status: "Filled", risk: "ok" },
      { time: "11:00–7:00", unit: "Memory Care", role: "RN", status: "Filled", risk: "ok" },
    ];
    return base.filter((s) => (search ? `${s.unit} ${s.role} ${s.time}`.toLowerCase().includes(search.toLowerCase()) : true));
  }, [search]);

  return (
    <AppShell title="Staffing dashboard" breadcrumbs="Dashboards • Scheduler / Staffing Coordinator">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap" }}>
        <div style={{ minWidth: 320, flex: "1 1 420px" }}>
          <div style={{ fontSize: "var(--type-h2-size)", lineHeight: "var(--type-h2-line)", fontWeight: 700 }}>Staffing dashboard</div>
          <div style={{ marginTop: "var(--space-4)" }}>
            <TextInput
              label="Search"
              value={search}
              onChange={setSearch}
              placeholder="Staff name, unit, shift ID"
              leadingIcon={Icon.Search}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", justifyContent: "flex-end" }}>
          <Button variant="primary" size="md" onClick={() => showToast({ variant: "info", title: "Create shift", message: "Create shift flow is not in scope yet." })}>
            Create shift
          </Button>
          <Button variant="secondary" size="md" onClick={() => showToast({ variant: "info", title: "Post open shifts", message: "Posting is not in scope yet." })}>
            Post open shifts
          </Button>
        </div>
      </div>

      <div style={{ height: "var(--space-6)" }} />

      {/* Today operations */}
      <div className="grid gridCols3">
        {ops.map((o) => (
          <Card key={o.label} variant="kpi" style={{ minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
              <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--type-label-md-size)", lineHeight: "var(--type-label-md-line)", fontWeight: 500 }}>
                {o.label}
              </div>
              <Badge variant={o.variant}>{o.value}</Badge>
            </div>
            <div style={{ fontSize: "var(--type-h2-size)", lineHeight: "var(--type-h2-line)", fontWeight: 700 }}>{o.value}</div>
            <div className="helperText">Today</div>
          </Card>
        ))}
      </div>

      <div style={{ height: "var(--space-6)" }} />

      {/* Shift board preview */}
      <Card variant="chart" style={{ minHeight: 420 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <Tabs variant="underline" tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />
          <Button variant="link" size="sm" onClick={() => showToast({ variant: "info", title: "Shift board", message: "Full shift board is not in scope yet." })}>
            Open full shift board
          </Button>
        </div>

        <div
          style={{
            marginTop: "var(--space-4)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          {shiftCards.map((s, idx) => {
            const border =
              s.risk === "error"
                ? "rgba(239, 68, 68, 0.55)"
                : s.risk === "warning"
                ? "rgba(245, 158, 11, 0.55)"
                : "var(--app-border)";

            const bg = s.status === "Unfilled" ? "rgba(245, 158, 11, 0.10)" : "var(--app-surface)";

            return (
              <div
                key={`${s.time}-${idx}`}
                className="surface surfaceInteractive"
                role="button"
                tabIndex={0}
                aria-label={`Shift ${s.time} ${s.unit} ${s.role}`}
                onClick={() => setDrawerOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDrawerOpen(true);
                  }
                }}
                style={{
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  border: `1px solid ${border}`,
                  background: bg,
                  minHeight: 72,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div style={{ fontWeight: 700 }}>{s.time}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <Badge variant={s.risk === "error" ? "error" : s.risk === "warning" ? "warning" : "neutral"} size="sm">
                    {s.role}
                  </Badge>
                  <span style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>{s.unit}</span>
                </div>
                <div className="helperText">{s.status}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ height: "var(--space-6)" }} />

      {/* Availability + compliance */}
      <div className="grid gridCols2">
        <Card style={{ minHeight: 260 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: 600 }}>Availability</div>
            <Button variant="secondary" size="sm" onClick={() => showToast({ variant: "info", title: "Filters", message: "Availability filters are mock." })}>
              Filters
            </Button>
          </div>

          <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {["Alex Kim • RN • Unit A", "Sam Patel • CNA • Memory Care", "Morgan Lee • LPN • Unit B", "Casey Rivera • CNA • Skilled Nursing"].map((t) => (
              <div
                key={t}
                style={{
                  padding: "var(--space-3)",
                  border: "1px solid var(--app-border)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-neutral-50)",
                }}
              >
                <div style={{ fontWeight: 600 }}>{t}</div>
                <div className="helperText">Available today • No conflicts</div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ minHeight: 260 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "var(--type-h4-size)", lineHeight: "var(--type-h4-line)", fontWeight: 600 }}>Compliance at risk</div>
            <Badge variant="warning">4</Badge>
          </div>

          <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {[
              { title: "CPR expires in 10 days", variant: "warning" },
              { title: "TB test overdue", variant: "error" },
              { title: "License verification needed", variant: "warning" },
              { title: "Background check renewal", variant: "info" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "var(--space-3)",
                  border: "1px solid var(--app-border)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-neutral-50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-3)",
                }}
              >
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <Badge variant={item.variant}>{item.variant === "error" ? "Overdue" : item.variant === "warning" ? "At risk" : "Info"}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Drawer open={drawerOpen} title="Shift details" onClose={() => setDrawerOpen(false)} size="desktop">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div>
            <div style={{ fontWeight: 700 }}>Memory Care • RN</div>
            <div className="helperText">2:00–10:00 • Unfilled • 1 conflict</div>
          </div>

          <Card style={{ padding: "var(--space-4)" }}>
            <div style={{ fontWeight: 600 }}>Suggested actions</div>
            <div className="helperText" style={{ marginTop: 6 }}>
              Offer incentive, or swap to avoid overtime (mock).
            </div>
          </Card>

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => {
              setDrawerOpen(false);
              showToast({ variant: "success", title: "Assignment saved", message: "Staff assigned to shift (mock)." });
            }}
          >
            Assign
          </Button>

          <Button variant="secondary" size="md" fullWidth onClick={() => setDrawerOpen(false)}>
            Close
          </Button>
        </div>
      </Drawer>
    </AppShell>
  );
}
