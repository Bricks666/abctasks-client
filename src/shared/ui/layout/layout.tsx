import cn from 'classnames';
import * as React from 'react';

import { CommonProps, Slots } from '@/shared/types';

import styles from './layout.module.css';


export interface LayoutProps
	extends CommonProps,
		Required<React.PropsWithChildren> {
	readonly slots?: Slots<'header'>;
}

export const Layout: React.FC<LayoutProps> = (props) => {
	const { className, children, slots = {}, } = props;

	const hasHeader = !!slots.header;
	const classes = cn(
		styles.wrapper,
		{
			[styles['wrapper--headerless']]: !hasHeader,
		},
		className
	);

	return (
		<div className={classes}>
			{slots.header}
			<main className={styles.layout}>{children}</main>
		</div>
	);
};
