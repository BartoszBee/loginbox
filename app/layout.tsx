import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Login Box App",
  description: "Projekt do portfolio - system logowania",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
