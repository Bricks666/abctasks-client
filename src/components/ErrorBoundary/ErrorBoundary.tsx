import * as React from 'react';
import { CommonProps } from '@/types/common';

export interface ErrorBoundaryProps extends CommonProps {}

export class ErrorBoundary extends React.Component<React.PropsWithChildren> {
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.log(errorInfo, error);
	}

	static getDerivedStateFromError() {
		return <div>Error</div>;
	}

	render(): React.ReactNode {
		const { children } = this.props;
		return children;
	}
}
