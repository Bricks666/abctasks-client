import classNames from 'classnames';
import * as React from 'react';
import { Transition, TransitionProps } from '../Transition';

import CollapseStyle from './Collapse.module.css';

export interface CollapseProps extends Omit<TransitionProps, 'classes'> {
	readonly direction?: 'horizontal' | 'vertical';
	readonly origin?: 'top' | 'bottom' | 'right' | 'left';
}

export const Collapse: React.FC<CollapseProps> = ({
	className,
	direction = 'vertical',
	origin = 'top',
	...props
}) => {
	const classes = classNames(
		CollapseStyle.collapse,
		CollapseStyle[direction],
		CollapseStyle[origin],
		className
	);
	const transitionClasses = {
		entering: CollapseStyle.open,
		entered: CollapseStyle.opened,
		exiting: CollapseStyle.close,
		exited: CollapseStyle.closed,
	};
	return (
		<Transition className={classes} classes={transitionClasses} {...props} />
	);
};
