import * as React from 'react';

export const usePageTitle = (title: string) => {
	React.useLayoutEffect(() => {
		document.title = title;
	}, [title]);
};
