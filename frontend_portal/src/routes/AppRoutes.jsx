import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth, RequireRole } from "./guards";
import LoginPage from "../screens/auth/LoginPage";
import RoleSelectionPage from "../screens/auth/RoleSelectionPage";
import AdminDashboardPage from "../screens/dashboards/AdminDashboardPage";
import SchedulerDashboardPage from "../screens/dashboards/SchedulerDashboardPage";
import CaregiverDashboardPage from "../screens/dashboards/CaregiverDashboardPage";

/**
 * PUBLIC_INTERFACE
 * AppRoutes defines the main app navigation for auth, role selection, and dashboards.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/roles" element={<RoleSelectionPage />} />
      </Route>

      <Route element={<RequireRole />}>
        <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
        <Route path="/dashboard/scheduler" element={<SchedulerDashboardPage />} />
        <Route path="/dashboard/caregiver" element={<CaregiverDashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
