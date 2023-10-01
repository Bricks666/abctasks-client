import ExitRoomIcon from '@mui/icons-material/MeetingRoom';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { mutation } from './model';

export interface ExitRoomUserButtonProps extends CommonProps {
	readonly roomId: number;
}

export const ExitRoomUserButton: React.FC<ExitRoomUserButtonProps> = (
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
			<Tooltip className={className} title='Exit from room'>
				<IconButton onClick={handlers.toggleOn}>
					<ExitRoomIcon />
				</IconButton>
			</Tooltip>

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
