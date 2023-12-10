import * as React from 'react';

export const withStrictMode =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<React.StrictMode>
					<Component />
				</React.StrictMode>
			);
		};
