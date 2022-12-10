import * as React from 'react';
import { ErrorBoundary } from '@/shared/components';

export const withErrorBoundary =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<ErrorBoundary>
					<Component />
				</ErrorBoundary>
			);
		};
