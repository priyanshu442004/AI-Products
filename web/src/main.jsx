import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { MotionConfig } from "motion/react";
import "@fontsource-variable/funnel-display";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/newsreader/400-italic.css";
import "./styles/index.css";
import { router } from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* reducedMotion="user" honours the OS "reduce motion" setting everywhere */}
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  </StrictMode>
);
