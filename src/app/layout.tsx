import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Header } from "./_components/header";
import { AppSidebar } from "./_components/sidebar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SidebarProvider
          defaultOpen={false}
          className="h-screen"
          style={
            {
              "--sidebar-width": "12rem",
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset>
            <Header />
            {children}
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
