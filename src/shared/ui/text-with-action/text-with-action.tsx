import { Button, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps, VoidFunction } from '@/shared/types';

import styles from './text-with-action.module.css';

export interface TextWithActionProps extends CommonProps {
	readonly text: string;
	readonly onClick: VoidFunction;
	readonly actionText: string;
	readonly icon?: React.ReactElement | null;
}

export const TextWithAction: React.FC<TextWithActionProps> = (props) => {
	const { text, onClick, className, actionText, icon, } = props;

	return (
		<div className={cn(styles.box, className)}>
			<Typography variant='h6' component='p'>
				{text}
			</Typography>
			<Button startIcon={icon} onClick={onClick}>
				{actionText}
			</Button>
		</div>
	);
};
