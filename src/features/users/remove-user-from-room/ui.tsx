import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { mutation } from './model';

export interface RemoveUserFromRoomProps extends CommonProps {
	readonly userId: number;
	readonly roomId: number;
}

export const RemoveUserFromRoom: React.FC<RemoveUserFromRoomProps> = (
	props
) => {
	const { userId, className, roomId, } = props;
	const { t, } = useTranslation('room-users');
	const removeUser = useUnit(mutation);

	const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

	const onAgree = React.useCallback(() => {
		removeUser.start({ userId, roomId, });
		toggleOff();
	}, [toggleOff, userId, roomId]);

	const title = t('actions.remove_user.title');
	const content = t('actions.remove_user.content');
	const open = t('actions.remove_user.actions.open');
	const agree = t('actions.remove_user.actions.agree');
	const disagree = t('actions.remove_user.actions.disagree');

	return (
		<>
			<Tooltip title={open}>
				<IconButton className={className} onClick={toggleOn}>
					<DeleteIcon />
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
