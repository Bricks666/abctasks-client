import * as React from 'react';
import cn from 'classnames';
import { Block } from '../Block';
import { CommonProps } from '@/interfaces/common';

import CardStyle from './Card.module.css';

export interface CardProps extends CommonProps {
	readonly shadowOn?: 'always' | 'hover' | 'never';
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
	className,
	children,
	shadowOn = 'hover',
}) => {
	const classes = cn(
		CardStyle.card,
		{
			[CardStyle.shadowAlways]: shadowOn === 'always',
			[CardStyle.shadowHover]: shadowOn === 'hover',
		},
		className
	);
	return <Block className={classes}>{children}</Block>;
};
