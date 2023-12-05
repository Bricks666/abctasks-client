import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { mutation } from './model';

export interface RemoveInvitationProps extends CommonProps {
	readonly id: number;
	readonly roomId: number;
}

export const RemoveInvitation: React.FC<RemoveInvitationProps> = (props) => {
	const { className, id, roomId, } = props;
	const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

	const { t, } = useTranslation('room-invitations');
	const removeInvitation = useUnit(mutation);

	const onAgree = React.useCallback(() => {
		removeInvitation.start({ id, roomId, });
		toggleOff();
	}, [toggleOff, id, roomId]);

	const title = t('actions.remove_invitation.title');
	const content = t('actions.remove_invitation.content');
	const open = t('actions.remove_invitation.actions.open');
	const agree = t('actions.remove_invitation.actions.agree');
	const disagree = t('actions.remove_invitation.actions.disagree');

	return (
		<>
			<Tooltip title={open}>
				<IconButton className={className} color='primary' onClick={toggleOn}>
					<RemoveIcon />
				</IconButton>
			</Tooltip>
			<Confirm
				isOpen={toggled}
				onClose={toggleOff}
				title={title}
				content={content}
				agreeText={agree}
				onAgree={onAgree}
				disagreeText={disagree}
				onDisagree={toggleOff}
			/>
		</>
	);
};
