import { render } from "@testing-library/react";
import { Component, ErrorInfo, Fragment, PropsWithChildren, ReactElement, ReactNode } from "react";

export class ErrorBoundary extends Component<PropsWithChildren> {
    state: ErrorState = {
        error: null,
    };
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ error });
        // console.log(errorInfo);
    }
    render(): ReactNode {
        return this.state.error ? (
            <div data-testid="error-boundary-message">{this.state.error.message}</div>
        ) : (
            <Fragment>{this.props.children}</Fragment>
        );
    }
}

export const expectThrowError = (callback: () => ReactElement) => {
    const { queryByTestId } = render(<ErrorBoundary>{callback()}</ErrorBoundary>);
    expect(queryByTestId("error-boundary-message")).toBeVisible();
};

type ErrorState = {
    error: Error | null;
};
