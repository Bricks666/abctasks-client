import cn from 'classnames';
import * as React from 'react';
import {
	LinkProps as ReactLinkProps,
	Link as ReactLink,
} from 'react-router-dom';
import { CommonProps } from '@/types/common';

import styles from './Link.module.css';

type LinkType = 'common' | 'react';

export interface LinkProps extends CommonProps, Readonly<ReactLinkProps> {
	readonly type: LinkType;
	readonly to: string;
}

export const Link: React.FC<LinkProps> = ({
	className,
	type,
	to,
	state,
	replace,
	reloadDocument,
	children,
	...link
}) => {
	const classes = cn(styles.link, className);
	if (type === 'common') {
		return (
			<a className={classes} href={to} {...link}>
				{children}
			</a>
		);
	}

	return (
		<ReactLink
			className={classes}
			state={state}
			to={to}
			replace={replace}
			reloadDocument={reloadDocument}
			{...link}>
			{children}
		</ReactLink>
	);
};
