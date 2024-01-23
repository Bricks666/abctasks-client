import ExitRoomIcon from '@mui/icons-material/MeetingRoom';
import { ListItemIcon, MenuItem } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

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
			<MenuItem className={className} onClick={handlers.toggleOn}>
				<ListItemIcon>
					<ExitRoomIcon />
				</ListItemIcon>
				{nameText}
			</MenuItem>
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
