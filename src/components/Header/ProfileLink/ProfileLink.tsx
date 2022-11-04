import * as React from 'react';
import { Avatar, Menu } from '@mui/material';
import { useMutation } from '@farfetched/react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { $AuthUser, logoutMutation } from '@/models/auth';
import { useToggle } from '@/hooks';
import { CommonProps } from '@/types';
import { MenuOption, MenuItem } from '@/ui/MenuItem';

export const ProfileLink: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('header');
	const user = useStore($AuthUser);
	const [isOpen, toggle] = useToggle(false);
	const [reference, setReference] = React.useState<HTMLElement | null>(null);
	const { start } = useMutation(logoutMutation);

	const options: MenuOption[] = React.useMemo(
		() => [
			{
				label: t('actions.settings'),
				to: '/settings',
			},
			{
				label: t('actions.logout'),
				onClick: () => start(),
			},
		],
		[start]
	);

	if (!user) {
		return null;
	}

	const { login, photo } = user;

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
			<Menu anchorEl={reference} open={isOpen} onClose={toggle}>
				{options.map((option) => (
					<MenuItem {...option} key={option.label} />
				))}
			</Menu>
		</div>
	);
};
