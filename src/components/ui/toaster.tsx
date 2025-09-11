import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import React from "react";

// Sanitiza valores para evitar rendering de objetos
const normalizeNode = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  // Se for objeto, converte para string segura
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "[Object]";
    }
  }
  return String(value);
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const safeTitle = title ? normalizeNode(title) : undefined;
        const safeDescription = description ? normalizeNode(description) : undefined;
        const safeAction = React.isValidElement(action) ? action : undefined;
        const allowedProps = {
          variant: (props as any).variant,
          open: (props as any).open,
          onOpenChange: (props as any).onOpenChange,
        };
        return (
          <Toast key={id} {...allowedProps}>
            <div className="grid gap-1">
              {safeTitle && <ToastTitle>{safeTitle}</ToastTitle>}
              {safeDescription && <ToastDescription>{safeDescription}</ToastDescription>}
            </div>
            {safeAction}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
