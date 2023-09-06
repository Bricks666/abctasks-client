import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import styles from './center.module.css';

export interface CenterProps extends CommonProps {
	readonly fullHeight?: boolean;
}

export const Center: React.FC<React.PropsWithChildren<CenterProps>> = (
	props
) => {
	const { className, fullHeight, children, } = props;

	const classes = cn(
		styles.center,
		{ [styles.fullHeight]: fullHeight, },
		className
	);

	return <div className={classes}>{children}</div>;
};
