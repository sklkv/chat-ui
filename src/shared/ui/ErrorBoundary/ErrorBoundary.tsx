import React, { ErrorInfo, PropsWithChildren } from "react";
import { ErrorBoundaryContext } from "@shared/lib";
import { APP_ROUTES } from "@shared/model";
import { IErrorBoundaryState, IErrorBoundaryProps } from "./types";

const initialState: IErrorBoundaryState = {
  hasError: false,
  errorResponseCode: null,
};

export class ErrorBoundary extends React.Component<
  PropsWithChildren<IErrorBoundaryProps>,
  IErrorBoundaryState
> {
  constructor(props: PropsWithChildren<IErrorBoundaryProps>) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("error:::", error);
    console.log("info:::", info);
  }

  componentDidUpdate(
    _: Readonly<IErrorBoundaryProps>,
    prevState: Readonly<IErrorBoundaryState>
  ): void {
    if (
      this.state.errorResponseCode === "401" &&
      prevState.errorResponseCode !== "401"
    ) {
      this.props.navigate(APP_ROUTES.SIGNIN);
    } else if (
      ["400", "404", "500"].includes(this.state.errorResponseCode as string) &&
      !["400", "404", "500"].includes(prevState.errorResponseCode as string)
    ) {
      // Ooops, что-то пошло не так
    }
  }

  setError = (error: Error) => {
    this.setState({ errorResponseCode: error.message });
  };

  resetErrorState() {
    this.setState(initialState);
  }

  render() {
    return (
      <ErrorBoundaryContext.Provider value={{ setError: this.setError }}>
        {this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}
