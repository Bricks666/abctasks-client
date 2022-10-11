import * as React from 'react';
import { useAnyPopupOpen, useToggle, useUserInfo } from '@/hooks';
import { CommonProps } from '@/interfaces/common';
import { Avatar } from '@/ui/Avatar';
import { logout } from '@/models/Auth';
import { Menu } from '@/ui/Menu';
import { MenuItem, MenuOption } from '@/ui/MenuItem';
import { ROUTES } from '@/const';

const options: MenuOption[] = [
	{
		label: 'Settings',
		to: ROUTES.SETTINGS.slice(0, -2),
	},
	{
		label: 'Logout',
		onClick: () => logout(),
	},
];

export const ProfileLink: React.FC<CommonProps> = ({ className }) => {
	const { login, photo } = useUserInfo();
	const [isOpen, toggle] = useToggle(false);
	const [reference, setReference] = React.useState<HTMLElement | null>(null);
	const anyPopupOpen = useAnyPopupOpen();
	return (
		<div className={className}>
			<Avatar
				src={photo || ''}
				alt={login}
				ref={setReference}
				onClick={toggle}
				tabIndex={0}
				aria-haspopup='menu'
				role='button'>
				{login[0]?.toUpperCase()}
			</Avatar>
			<Menu
				reference={reference}
				isOpen={isOpen}
				onClose={toggle}
				placement='bottom-end'
				isFocus={!anyPopupOpen}>
				{options.map((option) => (
					<MenuItem {...option} key={option.label} />
				))}
			</Menu>
		</div>
	);
};
