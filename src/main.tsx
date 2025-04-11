import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppVersionCrashReport } from "./components/AppVersionCrashReport";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ height: "95vh" }}>
      <AppVersionCrashReport />
    </div>
  </StrictMode>
);
