import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * @typedef {"admin"|"scheduler"|"caregiver"|null} UserRole
 */

/**
 * @typedef AuthState
 * @property {boolean} isAuthenticated
 * @property {UserRole} role
 * @property {{name: string, email: string}|null} user
 */

/**
 * PUBLIC_INTERFACE
 * AuthProvider provides minimal in-memory auth/role state for UI scaffolding.
 * This is intentionally mock-only until backend integration is implemented.
 */
export function AuthProvider({ children }) {
  const [state, setState] = useState(
    /** @type {AuthState} */ ({
      isAuthenticated: false,
      role: null,
      user: null,
    })
  );

  const api = useMemo(() => {
    // PUBLIC_INTERFACE
    const signIn = async ({ email }) => {
      // Mock: always succeed
      setState({
        isAuthenticated: true,
        role: null,
        user: { name: "Jordan Taylor", email },
      });
    };

    // PUBLIC_INTERFACE
    const signOut = () => {
      setState({ isAuthenticated: false, role: null, user: null });
    };

    // PUBLIC_INTERFACE
    const setRole = (role) => {
      setState((s) => ({ ...s, role }));
    };

    return { state, signIn, signOut, setRole };
  }, []);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * useAuth returns the auth API (state + actions). Must be used within AuthProvider.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
