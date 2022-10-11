import cn from 'classnames';
import * as React from 'react';
import { Transition, TransitionProps } from '../Transition';

import styles from './Collapse.module.css';

export interface CollapseProps extends Omit<TransitionProps, 'classes'> {
	readonly direction?: 'horizontal' | 'vertical';
	readonly origin?: 'top' | 'bottom' | 'right' | 'left';
}

export const Collapse: React.FC<React.PropsWithChildren<CollapseProps>> = ({
	className,
	direction = 'vertical',
	origin = 'top',
	...props
}) => {
	const classes = cn(
		styles.collapse,
		styles[direction],
		styles[origin],
		className
	);
	const transitionClasses = {
		entering: styles.open,
		entered: styles.opened,
		exiting: styles.close,
		exited: styles.closed,
	};
	return (
		<Transition className={classes} classes={transitionClasses} {...props} />
	);
};
