import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("🚀 Main.tsx: Starting application");

try {
  const rootElement = document.getElementById("root");
  console.log("📍 Main.tsx: Root element found:", !!rootElement);
  
  if (rootElement) {
    createRoot(rootElement).render(<App />);
    console.log("✅ Main.tsx: App rendered successfully");
  } else {
    console.error("❌ Main.tsx: Root element not found");
  }
} catch (error) {
  console.error("💥 Main.tsx: Error rendering app:", error);
}
