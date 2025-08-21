import { useState } from "react";
import { ToastContext } from "./ToastContext";
import Toast from "../components/Toast";

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      message,
      type,
      duration,
    };

    setToasts(prev => [...prev, newToast]);


    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showError = (message, duration) => showToast(message, "error", duration);
  const showSuccess = (message, duration) => showToast(message, "success", duration);
  const showWarning = (message, duration) => showToast(message, "warning", duration);
  const showInfo = (message, duration) => showToast(message, "info", duration);

  const value = {
    showToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-container">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={{
              position: "fixed",
              top: `${20 + index * 80}px`,
              right: "20px",
              zIndex: 1000,
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};