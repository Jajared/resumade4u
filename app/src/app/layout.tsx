"use client";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Top Navbar */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
          <Image src="/logo.png" alt="Logo" width={200} height={200} />
        </div>

        {/* Main Content */}
        <Container style={{ flex: 1 }}>{children}</Container>
      </div>
    </MantineProvider>
  );
}
