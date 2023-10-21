import ExitRoomIcon from '@mui/icons-material/MeetingRoom';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

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

	const { t, } = useTranslation('rooms');

	const exitRoom = useUnit(mutation);
	const [opened, handlers] = useToggle(false);

	const onExitAgree = React.useCallback(() => {
		exitRoom.start({ roomId, });
		handlers.toggleOff();
	}, [roomId]);

	const nameText = t('actions.exit_room.name');
	const titleText = t('actions.exit_room.title');
	const contentText = t('actions.exit_room.content');
	const actions = t('actions.exit_room.actions', {
		returnObjects: true,
	}) as Record<string, string>;

	return (
		<>
			<Tooltip className={className} title={nameText}>
				<IconButton onClick={handlers.toggleOn}>
					<ExitRoomIcon />
				</IconButton>
			</Tooltip>

			<Confirm
				isOpen={opened}
				onClose={handlers.toggleOff}
				title={titleText}
				content={contentText}
				agreeText={actions.agree}
				onAgree={onExitAgree}
				disagreeText={actions.disagree}
				onDisagree={handlers.toggleOff}
			/>
		</>
	);
};
