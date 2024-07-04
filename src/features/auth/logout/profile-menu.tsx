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

export type ProfileMenuProps = CommonProps;

/**
 * @todo
 * Extract settings button and exit button into different features.
 * @todo
 * Make it a widget
 */
export const ProfileMenu: React.FC<ProfileMenuProps> = ({ className, }) => {
	const { t, } = useTranslation('common');
	const user = useUnit(sessionModel.$user);
	const [isOpen, { toggle, }] = useToggle(false);
	const [reference, setReference] = React.useState<HTMLElement | null>(null);
	const logout = useUnit(mutation);

	if (!user) {
		return null;
	}

	const options: MenuOption<object>[] = [
		{
			label: t('profile_menu.items.settings'),
			onClick: console.log,
			icon: <SettingsIcon />,
		},
		{
			label: t('profile_menu.items.logout'),
			onClick: logout.start,
			icon: <LogoutIcon />,
		}
	];

	const { username, photo, email, } = user;

	const titleText = t('profile_menu.title', { username, });

	return (
		<div className={className}>
			<Tooltip title={titleText}>
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
