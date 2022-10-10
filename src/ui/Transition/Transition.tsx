import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';

export interface TransitionPair<T> {
	readonly enter?: T;
	readonly exit?: T;
}

export interface TransitionCSS {
	readonly entering?: string;
	readonly entered?: string;
	readonly exiting?: string;
	readonly exited?: string;
}

export interface TransitionProps extends CommonProps {
	readonly open: boolean;
	readonly easing?: TransitionPair<string> | string;
	readonly duration?: TransitionPair<number> | number;
	readonly classes?: TransitionCSS;
}

const transition = {
	enter: 195,
	exit: 195,
};
const standardEasing = 'ease-in';

export const Transition: React.FC<React.PropsWithChildren<TransitionProps>> = ({
	open,
	children,
	className,
	duration,
	easing,
	classes = {},
}) => {
	const { entered = '', entering = '', exited = '', exiting = '' } = classes;
	const enterDuration =
		(typeof duration === 'number' ? duration : duration?.enter) ||
		transition.enter;
	const exitDuration =
		(typeof duration === 'number' ? duration : duration?.exit) ||
		enterDuration ||
		transition.exit;
	const enterEasing =
		(typeof easing === 'string' ? easing : easing?.enter) || standardEasing;
	const exitEasing =
		(typeof easing === 'string' ? easing : easing?.exit) || standardEasing;

	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	React.useEffect(() => {
		setTimeout(() => setIsOpen(open));
	}, [open]);
	const classesNames = classNames(
		{
			[entering]: open,
			[exiting]: !open,
			[entered]: open && isOpen,
			[exited]: !open && !isOpen,
		},
		className
	);

	const styles: React.CSSProperties = {
		transitionDuration: `${open ? enterDuration : exitDuration}ms`,
		transitionTimingFunction: open ? enterEasing : exitEasing,
	};

	return (
		<div className={classesNames} style={styles}>
			{children}
		</div>
	);
};
