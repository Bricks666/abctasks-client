import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import StackStyle from './Stack.module.css';

type Space = 'xs' | 's' | 'm' | 'l' | 'xl' | 'none';

export interface StackProps extends CommonProps {
	readonly direction?: 'column' | 'row';
	readonly space?: Space;
}

export const Stack: React.FC<React.PropsWithChildren<StackProps>> = React.memo(
	function Stack({ children, className, direction = 'column', space = 'm' }) {
		const classes = cn(
			StackStyle.stack,
			StackStyle[direction],
			StackStyle[space],
			className
		);
		return <div className={classes}>{children}</div>;
	}
);
