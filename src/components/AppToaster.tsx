import React from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ToastBoundary from "@/components/ToastBoundary";

const AppToaster: React.FC = () => {
  const location = useLocation();

  // Avoid rendering toasts on the auth route to isolate potential issues
  if (location.pathname.startsWith("/auth")) return null;

  return (
    <ToastBoundary>
      <Toaster />
    </ToastBoundary>
  );
};

export default AppToaster;
