import cn from 'classnames';
import * as React from 'react';
import { Typography } from '@mui/material';
import { CommonProps, Size } from '@/types';

import styles from './LoadingIndicator.module.css';

export interface LoadingIndicatorProps extends CommonProps {
	readonly size?: Size;
	readonly text?: string | null;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props) => {
	const { className, text, size = 'medium', } = props;
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
				{text && (
					<Typography align='center' fontWeight={500} component='h2'>
						{text}
					</Typography>
				)}
			</div>
		</div>
	);
};
