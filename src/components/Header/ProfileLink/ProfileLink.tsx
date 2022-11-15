import * as React from 'react';
import { Avatar, Menu } from '@mui/material';
import { useMutation } from '@farfetched/react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { $AuthUser, logoutMutation } from '@/models';
import { useToggle } from '@/hooks';
import { CommonProps } from '@/types';
import { MenuOption, MenuItem } from '@/shared/components';

export const ProfileLink: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('header');
	const user = useUnit($AuthUser);
	const [isOpen, toggle] = useToggle(false);
	const [reference, setReference] = React.useState<HTMLElement | null>(null);
	const logout = useMutation(logoutMutation);

	const options: MenuOption<object>[] = React.useMemo(
		() => [
			{
				label: t('actions.settings'),
				onClick: console.log,
			},
			{
				label: t('actions.logout'),
				onClick: () => logout.start(),
			},
		],
		[]
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
