import { Link as MUILink } from '@mui/material';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
import * as React from 'react';
import { i18n, routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

import styles from './navigation.module.css';

const items = [
	{
		route: routes.rooms,
		label: i18n.t('title', { ns: 'rooms', }),
	}
];

export interface NavigationProps extends CommonProps {}

export const Navigation: React.FC<NavigationProps> = (props) => {
	const { className, } = props;
	return (
		<nav className={cn(styles.navigation, className)}>
			<ul className={styles.list}>
				{items.map((item) => (
					<li key={item.label}>
						<MUILink
							to={item.route}
							underline='hover'
							variant='body1'
							component={Link}>
							{item.label}
						</MUILink>
					</li>
				))}
			</ul>
		</nav>
	);
};
