import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../state/auth";
import { Icon } from "../icons/Icons";
import Button from "../ui/Button";

function roleLabel(role) {
  if (role === "admin") return "Community Administrator";
  if (role === "scheduler") return "Scheduler";
  if (role === "caregiver") return "Caregiver / Nurse";
  return "No role selected";
}

function navForRole(role) {
  const base = [
    { key: "home", label: "Dashboard", icon: Icon.Home, path: role ? `/dashboard/${role}` : "/roles" },
    { key: "messages", label: "Messages", icon: Icon.MessageSquare, path: role ? `/dashboard/${role}` : "/roles" },
    { key: "compliance", label: "Compliance", icon: Icon.Shield, path: role ? `/dashboard/${role}` : "/roles" },
  ];

  // Role-specific placeholders (dashboards only are in scope; keep navigation present but safe)
  if (role === "scheduler") {
    base.splice(1, 0, { key: "shiftboard", label: "Shift board", icon: Icon.Calendar, path: `/dashboard/${role}` });
  }
  if (role === "admin") {
    base.splice(1, 0, { key: "staff", label: "Staff directory", icon: Icon.Users, path: `/dashboard/${role}` });
  }
  if (role === "caregiver") {
    base.splice(1, 0, { key: "assignments", label: "Assignments", icon: Icon.Clipboard, path: `/dashboard/${role}` });
  }

  return base;
}

/**
 * PUBLIC_INTERFACE
 * AppShell is the core layout: responsive sidebar + topbar + main content region.
 * It accepts a title and optional breadcrumbs for topbar.
 */
export default function AppShell({ title, breadcrumbs, children }) {
  const { state, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = useMemo(() => navForRole(state.role), [state.role]);

  const sidebarCollapsed = useMemo(() => {
    // Auto-collapse at tablet widths; CSS also collapses at <=1024.
    return false;
  }, []);

  const currentPath = location.pathname;

  return (
    <div className={sidebarCollapsed ? "appShell appShellCollapsed" : "appShell"}>
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="sidebarHeader">
          <div className="sidebarLogoMark" aria-hidden="true">
            SC
          </div>
          <div>
            <div className="sidebarTitle">Staffing Portal</div>
            <div className="helperText" style={{ marginTop: 2 }}>
              Ocean Professional
            </div>
          </div>
        </div>

        <div className="sidebarRoleLabel" aria-label="Selected role">
          {roleLabel(state.role)}
        </div>

        <nav className="navList">
          {navItems.map((item) => {
            const active = item.path && currentPath.startsWith(item.path) && item.key === "home";
            const IconComp = item.icon;
            return (
              <div
                key={item.key}
                className={active ? "navItem navItemActive" : "navItem"}
                role="link"
                tabIndex={0}
                aria-current={active ? "page" : undefined}
                onClick={() => item.path && navigate(item.path)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    item.path && navigate(item.path);
                  }
                }}
              >
                <span className="navIcon" aria-hidden="true">
                  <IconComp />
                </span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="sidebarFooter">
          <div
            className="navItem"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/roles")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/roles");
              }
            }}
          >
            <span className="navIcon" aria-hidden="true">
              <Icon.Users />
            </span>
            <span>Switch role</span>
          </div>

          <div
            className="navItem"
            role="button"
            tabIndex={0}
            onClick={() => {
              signOut();
              navigate("/login");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                signOut();
                navigate("/login");
              }
            }}
          >
            <span className="navIcon" aria-hidden="true">
              <Icon.X />
            </span>
            <span>Sign out</span>
          </div>
        </div>
      </aside>

      {/* Content region */}
      <div style={{ minWidth: 0 }}>
        <header className="topbar" aria-label="Top bar">
          <div className="topbarLeft">
            <div className="topbarTitle">{title}</div>
            {breadcrumbs ? <div className="topbarBreadcrumbs">{breadcrumbs}</div> : null}
          </div>

          <div className="topbarRight">
            {/* Mobile menu button (shown on small screens) */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              style={{
                display: "none",
                border: "1px solid var(--app-border)",
                background: "var(--app-surface)",
                borderRadius: 10,
                minWidth: "var(--touch-target-min)",
                minHeight: "var(--touch-target-min)",
              }}
            >
              <span className="visuallyHidden">Menu</span>
              <Icon.Home />
            </button>

            <button
              type="button"
              aria-label="Notifications"
              style={{
                border: "1px solid var(--app-border)",
                background: "var(--app-surface)",
                borderRadius: 10,
                minWidth: "var(--touch-target-min)",
                minHeight: "var(--touch-target-min)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-secondary)",
              }}
              onClick={() => {
                // Mock behavior only
                window.alert("Notifications (mock)");
              }}
            >
              <Icon.Bell />
            </button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/roles")}
              ariaLabel="Switch role"
            >
              Switch role
            </Button>

            <div
              style={{
                border: "1px solid var(--app-border)",
                borderRadius: 12,
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "var(--app-surface)",
              }}
              aria-label="User menu"
            >
              <div
                aria-hidden="true"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "999px",
                  background: "rgba(37, 99, 235, 0.10)",
                  border: "1px solid rgba(37, 99, 235, 0.25)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--color-brand-primary-600)",
                }}
              >
                {state.user?.name?.split(" ").map((s) => s[0]).slice(0, 2).join("") || "U"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{state.user?.name || "User"}</span>
                <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{roleLabel(state.role)}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="page">
          <div className="pageContent">
            <div className="container">{children}</div>
          </div>
        </main>
      </div>

      {/* Mobile menu drawer (minimal) */}
      {mobileMenuOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          style={{ position: "fixed", inset: 0, zIndex: 70 }}
        >
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(17, 24, 39, 0.45)" }}
          />
          <div
            className="surface"
            style={{
              position: "absolute",
              left: 12,
              top: 12,
              right: 12,
              padding: "var(--space-4)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-3)" }}>
              <div style={{ fontWeight: 700 }}>Menu</div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  minWidth: "var(--touch-target-min)",
                  minHeight: "var(--touch-target-min)",
                  borderRadius: 10,
                }}
              >
                <Icon.X />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {navItems.map((item) => {
                const IconComp = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      item.path && navigate(item.path);
                    }}
                    style={{
                      border: "1px solid var(--app-border)",
                      background: "var(--app-surface)",
                      borderRadius: 12,
                      padding: "12px 14px",
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <IconComp />
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
              <Button variant="secondary" size="md" fullWidth onClick={() => navigate("/roles")}>
                Switch role
              </Button>
              <Button
                variant="danger"
                size="md"
                fullWidth
                onClick={() => {
                  signOut();
                  navigate("/login");
                }}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
