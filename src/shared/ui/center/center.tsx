import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import styles from './center.module.css';

type Height = 'auto' | 'container' | 'page' | 'content';

export interface CenterProps extends CommonProps {
	readonly height?: Height;
}

export const Center: React.FC<React.PropsWithChildren<CenterProps>> = (
	props
) => {
	const { className, children, height = 'auto', } = props;

	const classes = cn(styles.center, styles[height], className);

	return <div className={classes}>{children}</div>;
};
