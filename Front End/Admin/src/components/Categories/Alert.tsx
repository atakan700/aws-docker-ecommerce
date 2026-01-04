import { useEffect } from "react";
import { useAlert } from "../../context/AlertContext";

export default function Alert() {
  const { alert, hideAlert } = useAlert();

  // Auto-hide alert after 5 seconds
  useEffect(() => {
    if (alert.type) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert.type, hideAlert]);

  if (!alert.type) return null;

  const alertStyles = {
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const currentStyle = alertStyles[alert.type as keyof typeof alertStyles];

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-4 right-4 z-50 max-w-md w-full p-4 border rounded-lg shadow-lg flex items-start gap-3 animate-slide-in ${currentStyle.container}`}
    >
      <div className="flex-shrink-0">{currentStyle.icon}</div>
      
      <div className="flex-1 pt-0.5">
        <p className="text-sm font-medium">{alert.message}</p>
      </div>

      <button
        type="button"
        onClick={hideAlert}
        className="flex-shrink-0 ml-auto inline-flex text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 transition-colors"
        aria-label="Bildirimi kapat"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}