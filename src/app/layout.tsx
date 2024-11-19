import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";

import { Toaster } from "@/components/ui/toaster";
import { type Metadata } from "next";
import { Header } from "./_components/header";
import { AppSidebar } from "./_components/sidebar";

import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "e-paper",
  description: "Dashboard para gerenciamento de documentos",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${roboto.className}`}
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
