import {
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemSecondaryAction,
	ListItemText
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps, Slots } from '@/shared/types';

export interface TemplateInvitationListItemProps
	extends CommonProps,
		Omit<ListItemProps, 'slots'> {
	readonly slots: Required<Slots<'userAvatar'>> &
		Slots<'actions' | 'userAvatar'>;
	readonly inviterName: string;
	readonly username: string;
}

export const TemplateInvitationListItem: FC<TemplateInvitationListItemProps> = (
	props
) => {
	const { slots, inviterName, username, ...rest } = props;
	const { userAvatar, actions, } = slots;
	const { t, } = useTranslation('room-invitations');

	const secondaryLabel = t('list.item.inviter', { inviter_name: inviterName, });

	const actionsItem = actions ? (
		<ListItemSecondaryAction>{actions}</ListItemSecondaryAction>
	) : null;

	return (
		<ListItem {...rest}>
			<ListItemAvatar>{userAvatar}</ListItemAvatar>
			<ListItemText primary={username} secondary={secondaryLabel} />

			{actionsItem}
		</ListItem>
	);
};
