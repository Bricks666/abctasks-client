import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { UserAvatar } from '@/entities/users';

import { useToggle } from '@/shared/lib';
import { sessionModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import { MenuOption, MenuItem, Menu } from '@/shared/ui';

import { mutation } from './model';

export const ProfileMenu: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('common');
	const user = useUnit(sessionModel.$user);
	const [isOpen, { toggle, }] = useToggle(false);
	const [reference, setReference] = React.useState<HTMLElement | null>(null);
	const logout = useUnit(mutation);

	if (!user) {
		return null;
	}

	const items = t('profile_menu.items', { returnObjects: true, }) as Record<
		string,
		string
	>;

	const options: MenuOption<object>[] = [
		{
			label: items.settings,
			onClick: console.log,
			icon: <SettingsIcon />,
		},
		{
			label: items.logout,
			onClick: logout.start,
			icon: <LogoutIcon />,
		}
	];

	const { username, photo, email, } = user;

	const title = t('profile_menu.title', { username, });

	return (
		<div className={className}>
			<Tooltip title={title}>
				<IconButton onClick={toggle} ref={setReference}>
					<UserAvatar
						username={username}
						email={email}
						photo={photo}
						disableTooltip
					/>
				</IconButton>
			</Tooltip>

			<Menu anchorEl={reference} open={isOpen} onClose={toggle}>
				{options.map((option) => (
					<MenuItem {...option} key={option.label} />
				))}
			</Menu>
		</div>
	);
};
