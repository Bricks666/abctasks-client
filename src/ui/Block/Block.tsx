import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';

import BlockStyle from './Block.module.css';

type Type = 'rounded' | 'square';

export interface BlockProps
	extends CommonProps,
		Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
	readonly type?: Type;
}

export const Block: React.FC<BlockProps> = React.memo(function Block({
	children,
	className,
	type = 'rounded',
	...props
}) {
	const classes = classNames(BlockStyle.block, BlockStyle[type], className);
	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
});
