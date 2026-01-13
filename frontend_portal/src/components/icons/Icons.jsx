import React from "react";

function baseProps(props) {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
  };
}

/**
 * PUBLIC_INTERFACE
 * Icon is a namespace for simple outline SVG icons used across the UI.
 */
export const Icon = {
  Home: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  Calendar: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  Users: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a3 3 0 0 1 0 5.74" />
    </svg>
  ),
  Bell: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Search: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  ChevronDown: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  X: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  Shield: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
    </svg>
  ),
  Clipboard: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
    </svg>
  ),
  MessageSquare: (props) => (
    <svg {...baseProps(props)} aria-hidden="true">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  ),
};
