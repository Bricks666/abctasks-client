import * as React from 'react';
import { useMutation } from '@farfetched/react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { $AuthUser, logoutMutation } from '@/models/auth';
import { useAnyPopupOpen, useToggle } from '@/hooks';
import { CommonProps } from '@/types/common';
import { Menu } from '@/ui/Menu';
import { MenuItem, MenuOption } from '@/ui/MenuItem';
import { Avatar } from '@/ui/Avatar';
import { ROUTES } from '@/const';

export const ProfileLink: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('header');
	const user = useStore($AuthUser);
	const [isOpen, toggle] = useToggle(false);
	const [reference, setReference] = React.useState<HTMLElement | null>(null);
	const anyPopupOpen = useAnyPopupOpen();
	const { start } = useMutation(logoutMutation);

	const options: MenuOption[] = React.useMemo(
		() => [
			{
				label: t('actions.settings'),
				to: ROUTES.SETTINGS.slice(0, -2),
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
