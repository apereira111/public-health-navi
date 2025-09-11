import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const GlobalErrorMonitor = () => {
  const { toast } = useToast();

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      console.error("[GlobalError] window.error:", event.error || event.message, event);
      try {
        toast({
          title: "Erro inesperado",
          description: (event.error && (event.error.message || String(event.error))) || String(event.message || "Erro"),
          variant: "destructive",
        });
      } catch {}
    };
    const onUnhandled = (event: PromiseRejectionEvent) => {
      console.error("[GlobalError] unhandledrejection:", event.reason, event);
      try {
        toast({
          title: "Falha em promessa",
          description: (event.reason && (event.reason.message || String(event.reason))) || "Rejeição sem tratamento",
          variant: "destructive",
        });
      } catch {}
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandled);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandled);
    };
  }, [toast]);

  return null;
};

export default GlobalErrorMonitor;
