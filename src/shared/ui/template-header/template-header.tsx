import { AppBar, Toolbar } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps, Slots } from '@/shared/types';

import styles from './template-header.module.css';

export interface TemplateHeaderProps extends CommonProps {
	readonly slots?: Slots<'left' | 'right' | 'center'>;
}

export const TemplateHeader: React.FC<TemplateHeaderProps> = (props) => {
	const { className, slots = {}, } = props;

	return (
		<AppBar
			className={cn(styles.container, className)}
			position='static'
			color='default'
			elevation={0}
			variant='outlined'>
			<Toolbar className={styles.bar}>
				<div className={cn(styles.left, styles.side)}>{slots.left}</div>
				{slots.center ? (
					<div className={styles.center}>{slots.center}</div>
				) : null}
				<div className={cn(styles.right, styles.side)}>{slots.right}</div>
			</Toolbar>
		</AppBar>
	);
};
