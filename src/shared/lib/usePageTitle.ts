import * as React from 'react';

export const usePageTitle = (title: string) => {
	React.useLayoutEffect(() => {
		const lastTitle = title;

		document.title = title;

		return () => {
			document.title = lastTitle;
		};
	}, [title]);
};
