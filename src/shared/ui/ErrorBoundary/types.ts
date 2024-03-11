import { NavigateFunction } from "react-router-dom";

export interface IErrorBoundaryState {
  hasError: boolean;
  errorResponseCode: string | null;
}

export interface IErrorBoundaryProps {
  navigate: NavigateFunction;
}
