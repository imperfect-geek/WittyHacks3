import { emptyfunction } from "constants/placeholders";
import React from "react";

const initialValue = {
  open: false,
  message: "",
  severity: "info",
  autoHideDuration: 10000,
  vertical: "top",
  horizontal: "center",
};

export const SnackbarContext = React.createContext({
  state: initialValue,
  open: emptyfunction,
  close: emptyfunction,
});

const SnackbarProvider = ({ children }) => {
  const [state, setState] = React.useState(initialValue);
  const close = () => setState({ ...state, open: false });
  const open = (message, severity) =>
    setState((state) => ({
      ...state,
      open: true,
      message,
      severity,
    }));
  const value = {
    open,
    close,
    state,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
