"use client";

import { AppProvider } from "./AppContext";

export default function AppProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppProvider>{children}</AppProvider>;
}
