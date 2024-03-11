import { createContext, useContext } from "react";

export const ErrorBoundaryContext = createContext<{
  setError: (error: Error) => void;
}>({
  setError: () => {},
});

export const useErrorBoundaryContext = () => useContext(ErrorBoundaryContext);
