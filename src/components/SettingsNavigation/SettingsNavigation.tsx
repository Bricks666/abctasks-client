import * as React from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';
import { routes } from '@/const';
import { i18n } from '@/i18n';
import { CommonProps } from '@/types';

const navigation = [
	{
		label: i18n.t('navigation.generic', { ns: 'settings' }),
		to: routes.ROUTES.SETTINGS_GENERIC,
	},
	{
		label: i18n.t('navigation.profile', { ns: 'settings' }),
		to: routes.ROUTES.SETTINGS_PROFILE,
	},
];

export const SettingsNavigation: React.FC<CommonProps> = ({ className }) => {
	return (
		<section className={className}>
			<List>
				{navigation.map(({ label, ...props }) => (
					<ListItem key={label}>
						<ListItemButton {...props}>{label}</ListItemButton>
					</ListItem>
				))}
			</List>
		</section>
	);
};
