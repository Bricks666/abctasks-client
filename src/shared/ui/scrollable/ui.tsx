import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import styles from './styles.module.css';

export type ScrollDirection = 'vertical' | 'horizontal';

interface BaseScrollableProps<Component extends React.ElementType>
	extends CommonProps {
	readonly direction: ScrollDirection;
	readonly hideScroll?: boolean;
	readonly component?: Component;
}

export type ScrollableProps<Component extends React.ElementType> =
	BaseScrollableProps<Component> &
		Omit<React.ComponentProps<Component>, keyof BaseScrollableProps<Component>>;

export const Scrollable = <Component extends React.ElementType>(
	props: ScrollableProps<Component>
): React.ReactElement => {
	const {
		direction,
		hideScroll = true,
		component = 'div',
		className,
		children,
		...rest
	} = props;

	const classes = cn(styles.container, styles[`container--${direction}`], {
		[styles['container--hide-scroll']]: hideScroll,
	});

	return React.createElement(
		component,
		{
			...rest,
			className: classes,
		},
		<div className={cn(styles.indicator, styles['indicator--start'])} />,
		<div className={className}>{children}</div>,
		<div className={cn(styles.indicator, styles['indicator--end'])} />
	);
};
