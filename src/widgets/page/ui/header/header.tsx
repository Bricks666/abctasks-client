import { AppBar, Toolbar } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { ProfileMenu } from '@/features/auth';
import { CommonProps } from '@/shared/types';
import { Menu } from '../menu';

import styles from './header.module.css';

export interface HeaderProps extends CommonProps {
	readonly leftContent?: React.ReactNode | null;
	readonly centerContent?: React.ReactNode | null;
	readonly rightContent?: React.ReactNode | null;
}

export const Header: React.FC<HeaderProps> = (props) => {
	const { className, centerContent, leftContent, rightContent, } = props;
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
					{leftContent}
				</div>
				{centerContent ? (
					<div className={styles.center}>{centerContent}</div>
				) : null}
				<div className={cn(styles.right, styles.side)}>
					{rightContent} <ProfileMenu />
				</div>
			</Toolbar>
		</AppBar>
	);
};
