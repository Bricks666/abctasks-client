import * as React from 'react';
import cn from 'classnames';
import { Block } from '../Block';
import { CommonProps } from '@/types';

import styles from './Card.module.css';

export interface CardProps extends CommonProps {
	readonly shadowOn?: 'always' | 'hover' | 'never';
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
	className,
	children,
	shadowOn = 'hover',
}) => {
	const classes = cn(
		styles.card,
		{
			[styles.shadowAlways]: shadowOn === 'always',
			[styles.shadowHover]: shadowOn === 'hover',
		},
		className
	);
	return <Block className={classes}>{children}</Block>;
};
