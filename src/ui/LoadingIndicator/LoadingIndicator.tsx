import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/types';

import styles from './LoadingIndicator.module.css';

type Size = 'small' | 'medium' | 'large';

export interface LoadingIndicatorProps extends CommonProps {
	readonly size?: Size;
	readonly text?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
	className,
	text,
	size = 'medium',
}) => {
	const classes = cn(styles.indicatorContainer, styles[size]);

	return (
		<div className={className}>
			<progress className='visibility-hidden' />
			<div className={classes}>
				<div className={styles.circleGroup}>
					<span className={cn(styles.circle, styles.circle1)} />
					<span className={cn(styles.circle, styles.circle2)} />
					<span className={cn(styles.circle, styles.circle3)} />
					<span className={cn(styles.circle, styles.circle4)} />
				</div>
				{text && <h2 className={styles.header}>{text}</h2>}
			</div>
		</div>
	);
};
