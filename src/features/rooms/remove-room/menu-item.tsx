import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemIcon, MenuItem, MenuItemProps } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { mutation } from './model';

export interface RemoveRoomMenuItemProps extends CommonProps, MenuItemProps {
	readonly roomId: number;
}

export const RemoveRoomMenuItem: React.FC<RemoveRoomMenuItemProps> = (
	props
) => {
	const { roomId, className, } = props;
	const { t, } = useTranslation('remove-room');
	const removeRoom = useUnit(mutation);
	const [open, handlers] = useToggle(false);

	const onAgree = React.useCallback(() => {
		removeRoom.start({ roomId, });
		handlers.toggleOff();
	}, [roomId]);

	const nameText = t('name');
	const titleText = t('title');
	const contentText = t('content');
	const actions = t('actions', { returnObjects: true, }) as Record<
		string,
		string
	>;

	return (
		<>
			<MenuItem className={className} onClick={handlers.toggleOn}>
				<ListItemIcon>
					<DeleteIcon />
				</ListItemIcon>
				{nameText}
			</MenuItem>
			<Confirm
				isOpen={open}
				onClose={handlers.toggleOff}
				title={titleText}
				content={contentText}
				agreeText={actions.agree}
				onAgree={onAgree}
				disagreeText={actions.disagree}
				onDisagree={handlers.toggleOff}
			/>
		</>
	);
};
