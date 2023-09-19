import { AppBar, Toolbar } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { ProfileMenu } from '@/features/auth';

import { CommonProps, Slots } from '@/shared/types';

import { Menu } from '../menu';

import styles from './header.module.css';

export interface HeaderProps extends CommonProps {
	readonly slots?: Slots<'left' | 'right' | 'center'>;
}

export const Header: React.FC<HeaderProps> = (props) => {
	const { className, slots = {}, } = props;

	return (
		<AppBar
			className={className}
			position='static'
			color='transparent'
			elevation={0}
			variant='outlined'>
			<Toolbar className={styles.bar}>
				<div className={cn(styles.left, styles.side)}>
					<Menu />
					{slots.left}
				</div>
				{slots.center ? (
					<div className={styles.center}>{slots.center}</div>
				) : null}
				<div className={cn(styles.right, styles.side)}>
					{slots.right} <ProfileMenu />
				</div>
			</Toolbar>
		</AppBar>
	);
};
