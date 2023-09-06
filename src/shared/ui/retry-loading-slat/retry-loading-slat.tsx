import ReplayIcon from '@mui/icons-material/Replay';
import { Button, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps, VoidFunction } from '@/shared/types';

import styles from './retry-loading-slat.module.css';

export interface RetryLoadingSlatProps extends CommonProps {
	readonly content: string;
	readonly onRetry: VoidFunction;
	readonly buttonText: string;
	readonly icon?: React.ReactElement | null;
}

export const RetryLoadingSlat: React.FC<RetryLoadingSlatProps> = (props) => {
	const {
		content,
		onRetry,
		className,
		icon = <ReplayIcon />,
		buttonText,
	} = props;

	return (
		<div className={cn(styles.box, className)}>
			<Typography variant='h6' component='p'>
				{content}
			</Typography>
			<Button startIcon={icon} onClick={onRetry}>
				{buttonText}
			</Button>
		</div>
	);
};
