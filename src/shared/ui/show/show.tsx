import * as React from 'react';

export interface ShowProps extends Required<React.PropsWithChildren> {
	readonly show: boolean;
}

export const Show: React.FC<ShowProps> = (props) => {
	const { show, children, } = props;

	if (show) {
		return children;
	}

	return null;
};
