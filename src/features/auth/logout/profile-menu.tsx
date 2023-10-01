import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Menu, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { UserAvatar } from '@/entities/users';

import { useToggle } from '@/shared/lib';
import { sessionModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import { MenuOption, MenuItem } from '@/shared/ui';

import { mutation } from './model';

export const ProfileMenu: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('header');
	const user = useUnit(sessionModel.$user);
	const [isOpen, { toggle, }] = useToggle(false);
	const [reference, setReference] = React.useState<HTMLElement | null>(null);
	const logout = useUnit(mutation);

	const options: MenuOption<object>[] = [
		{
			label: t('actions.settings'),
			onClick: console.log,
			icon: <SettingsIcon />,
		},
		{
			label: t('actions.logout'),
			onClick: () => logout.start(),
			icon: <LogoutIcon />,
		}
	];

	if (!user) {
		return null;
	}

	const { username, photo, email, } = user;

	return (
		<div className={className}>
			<Tooltip title='Profile settings'>
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