import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';

import ListStyle from './List.module.css';

export interface ListProps extends CommonProps {
	readonly dense?: boolean;
}

export const List: React.FC<React.PropsWithChildren<ListProps>> = ({
	className,
	dense,
	children,
}) => {
	const classes = classNames(
		ListStyle.list,
		{
			[ListStyle.dense]: dense,
		},
		className
	);
	return <ul className={classes}>{children}</ul>;
};
