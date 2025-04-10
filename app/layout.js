import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Employee Directory System",
  description: "Manage your organization's employee information",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism],
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
