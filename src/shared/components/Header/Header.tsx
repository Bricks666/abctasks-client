import { AppBar, Toolbar } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { NavigationBreadcrumbs, ProfileLink } from './components';

import styles from './Header.module.css';
import { CommonProps } from '@/types';

export const Header: React.FC<CommonProps> = ({ className, }) => {
	return (
		<AppBar
			className={cn(styles.header, className)}
			position='static'
			color='transparent'>
			<Toolbar className={styles.bar}>
				<NavigationBreadcrumbs />
				<ProfileLink className={styles.avatar} />
			</Toolbar>
		</AppBar>
	);
};
