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
	const { t, } = useTranslation('rooms');
	const removeRoom = useUnit(mutation);
	const [open, handlers] = useToggle(false);

	const onAgree = React.useCallback(() => {
		removeRoom.start({ roomId, });
		handlers.toggleOff();
	}, [roomId]);

	const label = t('actions.remove', { ns: 'common', });

	return (
		<>
			<MenuItem className={className} onClick={handlers.toggleOn}>
				<ListItemIcon>
					<DeleteIcon />
				</ListItemIcon>
				{label}
			</MenuItem>
			<Confirm
				isOpen={open}
				onClose={handlers.toggleOff}
				title='Are you sure?'
				content='Don you want to delete this room? All tasks and tags will be deleted'
				agreeText='Delete'
				onAgree={onAgree}
				disagreeText='Cancel'
				onDisagree={handlers.toggleOff}
			/>
		</>
	);
};
