import * as React from 'react';
import { Transition, TransitionProps } from '../Transition';

import FadeStyle from './Fade.module.css';

export const Fade: React.FC<
	React.PropsWithChildren<Omit<TransitionProps, 'classes'>>
> = (props) => {
	const classes = {
		entering: FadeStyle.open,
		entered: FadeStyle.opened,
		exiting: FadeStyle.close,
		exited: FadeStyle.closed,
	};
	return (
		<Transition className={FadeStyle.container} {...props} classes={classes} />
	);
};
