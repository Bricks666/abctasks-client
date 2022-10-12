import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';

import styles from './Block.module.css';

type Type = 'rounded' | 'square';

export interface BlockProps
	extends CommonProps,
		Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
	readonly type?: Type;
	readonly shadowOn?: 'always' | 'hover' | 'never';
}

export const Block: React.FC<BlockProps> = React.memo(function Block({
	children,
	className,
	type = 'rounded',
	...props
}) {
	const classes = cn(styles.block, styles[type], className);
	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
});
