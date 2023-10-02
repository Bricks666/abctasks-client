import ExitRoomIcon from '@mui/icons-material/MeetingRoom';
import { ListItemIcon, MenuItem } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { mutation } from './model';

export interface ExitRoomUserMenuItemProps extends CommonProps {
	readonly roomId: number;
}

export const ExitRoomUserMenuItem: React.FC<ExitRoomUserMenuItemProps> = (
	props
) => {
	const { className, roomId, } = props;

	const exitRoom = useUnit(mutation);
	const [opened, handlers] = useToggle(false);

	const onExitAgree = React.useCallback(() => {
		exitRoom.start({ roomId, });
		handlers.toggleOff();
	}, [roomId]);

	return (
		<>
			<MenuItem className={className} onClick={handlers.toggleOn}>
				<ListItemIcon>
					<ExitRoomIcon />
				</ListItemIcon>
				Exit from room
			</MenuItem>
			<Confirm
				isOpen={opened}
				onClose={handlers.toggleOff}
				title='Are you sure?'
				content='Don you want to exit this room?'
				agreeText='Exit'
				onAgree={onExitAgree}
				disagreeText='Cancel'
				onDisagree={handlers.toggleOff}
			/>
		</>
	);
};
