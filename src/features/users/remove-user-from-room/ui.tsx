import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

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

	const removeUser = useUnit(mutation);

	const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

	const onAgree = React.useCallback(() => {
		removeUser.start({ userId, roomId, });
		toggleOff();
	}, [toggleOff, userId, roomId]);

	return (
		<>
			<IconButton className={className} onClick={toggleOn} title='Remove user'>
				<DeleteIcon />
			</IconButton>
			<Confirm
				isOpen={toggled}
				onClose={toggleOff}
				title='Are you sure?'
				content='Don you want to delete this user?'
				agreeText='Remove'
				onAgree={onAgree}
				disagreeText='Cancel'
				onDisagree={toggleOff}
			/>
		</>
	);
};
