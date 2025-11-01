// AlertContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AlertType = "success" | "error" | null;

type AlertState = {
  message: string;
  type: AlertType;
};

type AlertContextType = {
  alert: AlertState;
  showAlert: (message: string, type: AlertType) => void;
  clearAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertState>({ message: "", type: null });

  const showAlert = (message: string, type: AlertType) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: null }), 3000); // otomatik kaybolsun
  };

  const clearAlert = () => setAlert({ message: "", type: null });

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used inside AlertProvider");
  return context;
}
