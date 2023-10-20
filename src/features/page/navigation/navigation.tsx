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
import { useTranslation } from 'react-i18next';

import { routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

import styles from './navigation.module.css';

export interface NavigationProps extends CommonProps {}

export const Navigation: React.FC<NavigationProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('navigation');

	const roomsText = t('items.rooms');

	const items = [
		{
			route: routes.rooms,
			label: roomsText,
			icon: <HomeIcon />,
		}
	];

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
