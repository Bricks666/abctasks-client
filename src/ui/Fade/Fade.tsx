import * as React from 'react';
import { Transition, TransitionProps } from '../Transition';

import styles from './Fade.module.css';

export const Fade: React.FC<
	React.PropsWithChildren<Omit<TransitionProps, 'classes'>>
> = (props) => {
	const classes = {
		entering: styles.open,
		entered: styles.opened,
		exiting: styles.close,
		exited: styles.closed,
	};
	return (
		<Transition className={styles.container} {...props} classes={classes} />
	);
};
