import * as React from 'react';

import { CommonProps } from '@/shared/types';

export interface ErrorBoundaryProps extends CommonProps {}

export class ErrorBoundary extends React.Component<React.PropsWithChildren> {
	componentDidCatch(error: Error): void {
		console.log(error);
	}

	static getDerivedStateFromError() {
		return <div>Error</div>;
	}

	render(): React.ReactNode {
		const { children, } = this.props;
		return children;
	}
}
