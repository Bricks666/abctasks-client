import * as React from 'react';

import { ErrorBoundary } from '@/widgets/page';

export const withErrorBoundary =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<ErrorBoundary>
					<Component />
				</ErrorBoundary>
			);
		};
