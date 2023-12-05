import ReplayIcon from '@mui/icons-material/Replay';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
	InvitationListItem,
	InvitationListItemProps
} from '@/widgets/invitations';

import {
	SkeletonInvitationListItem,
	invitationsModel
} from '@/entities/invitations';

import { Invitation } from '@/shared/api';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { FriendlyList, TextWithAction } from '@/shared/ui';

export interface InvitationListProps extends CommonProps {}

export const InvitationList: React.FC<InvitationListProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-invitations');
	const roomId = useParam(routes.room.users, 'id');

	const emptyText = t('list.empty_text');

	return (
		<FriendlyList<Invitation[], InvitationListItemProps, any>
			className={className}
			$query={invitationsModel.query}
			getData={(invitation) =>
				invitation.map((invitation) => ({
					id: invitation.id,
					email: invitation.user.email,
					username: invitation.user.username,
					photo: invitation.user.photo,
					inviterName: invitation.inviter.username,
					roomId,
				}))
			}
			getKey={(item) => item.id}
			skeletonsCount={25}
			ErrorComponent={Error}
			ItemComponent={InvitationListItem}
			SkeletonComponent={SkeletonInvitationListItem}
			emptyText={emptyText}
		/>
	);
};

const Error: React.FC = () => {
	const { t, } = useTranslation('room-invitations');

	const roomId = useParam(routes.room.users, 'id');
	const start = useUnit(invitationsModel.query.start);

	const text = t('actions.retry_invitations.text');
	const actionText = t('actions.retry', { ns: 'common', });

	const onRetry = React.useCallback(() => {
		start({ roomId, });
	}, [roomId]);

	return (
		<TextWithAction
			actionText={actionText}
			text={text}
			onClick={onRetry}
			icon={<ReplayIcon />}
		/>
	);
};
