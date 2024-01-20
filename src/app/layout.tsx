"use client";
import Navbar from "../components/Navbar/Navbar";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <div style={{ display: "flex", flex: 1 }}>
        <Navbar />
        <Container style={{ flex: 1, padding: "20px" }}>{children}</Container>
      </div>
    </MantineProvider>
  );
}
