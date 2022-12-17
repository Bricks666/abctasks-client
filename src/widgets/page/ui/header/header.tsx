import { AppBar, Toolbar } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { ProfileMenu } from '@/features/auth';
import { CommonProps } from '@/shared/types';

import styles from './header.module.css';

export interface HeaderProps extends CommonProps {}

export const Header: React.FC<HeaderProps> = (props) => {
	const { className, } = props;
	return (
		<AppBar
			className={cn(styles.header, className)}
			position='static'
			color='transparent'>
			<Toolbar className={styles.bar}>
				<ProfileMenu className={styles.avatar} />
			</Toolbar>
		</AppBar>
	);
};
