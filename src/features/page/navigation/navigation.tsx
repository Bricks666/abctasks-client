import HomeIcon from '@mui/icons-material/Home';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
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
		icon: <HomeIcon />,
	}
];

export interface NavigationProps extends CommonProps {}

export const Navigation: React.FC<NavigationProps> = (props) => {
	const { className, } = props;
	return (
		<nav className={cn(styles.navigation, className)}>
			<List className={styles.list}>
				{items.map((item) => (
					<ListItem key={item.label} disablePadding>
						<ListItemButton to={item.route} component={Link}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{
									variant: 'subtitle1',
									component: 'p',
								}}
								primary={item.label}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</nav>
	);
};
