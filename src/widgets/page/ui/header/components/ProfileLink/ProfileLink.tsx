import { useMutation } from '@farfetched/react';
import { Avatar, Menu } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useToggle } from '@/shared/lib';
import { $AuthUser, logoutMutation } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import { MenuOption, MenuItem } from '@/shared/ui';

export const ProfileLink: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('header');
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
			}
		],
		[]
	);

	if (!user) {
		return null;
	}

	const { login, photo, } = user;

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
