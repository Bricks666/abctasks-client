import * as React from 'react';
import cn from 'classnames';
import { AppBar, Toolbar } from '@mui/material';
import { CommonProps } from '@/types';
import { ProfileLink } from './ProfileLink';
import { NavigationBreadcrumbs } from './NavigationBreadcrumbs';

import styles from './Header.module.css';

export const Header: React.FC<CommonProps> = ({ className }) => {
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
