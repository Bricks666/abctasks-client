import * as React from 'react';

export const usePageTitle = (title: string) => {
	React.useLayoutEffect(() => {
		const lastTitle = document.title;

		document.title = title;

		return () => {
			document.title = lastTitle;
		};
	}, [title]);
};
