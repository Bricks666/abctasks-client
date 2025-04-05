import {
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	type ListItemProps
} from '@mui/material';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { CommonProps, Slots } from '@/shared/types';

type InvitationSlots = 'actions' | 'userAvatar';
type RequiredInvitationSlots = Extract<InvitationSlots, 'userAvatar'>;

export interface InvitationListItemTemplateProps
	extends CommonProps,
		Omit<ListItemProps, 'slots'> {
	readonly slots: Slots<InvitationSlots, RequiredInvitationSlots>;
	readonly inviterName: string;
	readonly username: string;
}

export const InvitationListItemTemplate: FC<InvitationListItemTemplateProps> = (
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
