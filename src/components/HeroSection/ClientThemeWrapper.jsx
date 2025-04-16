"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

export function ClientThemeWrapper({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}