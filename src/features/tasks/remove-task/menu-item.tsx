import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemIcon, MenuItem } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { mutation } from './model';

export interface RemoveTaskMenuItemProps extends CommonProps {
	readonly roomId: number;
	readonly taskId: number;
}

export const RemoveTaskMenuItem: React.FC<RemoveTaskMenuItemProps> = React.memo(
	(props) => {
		const { className, taskId, roomId, } = props;
		const { t, } = useTranslation('common');
		const removeTask = useUnit(mutation);
		const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

		const onAgree = React.useCallback(() => {
			removeTask.start({ id: taskId, roomId, });
			toggleOff();
		}, [toggleOff, taskId, roomId]);

		const label = t('actions.remove');

		return (
			<MenuItem className={className} onClick={toggleOn}>
				<ListItemIcon>
					<DeleteIcon />
				</ListItemIcon>
				{label}

				<Confirm
					isOpen={toggled}
					onClose={toggleOff}
					title='Are you sure?'
					content='Don you want to delete this task?'
					agreeText='Delete'
					onAgree={onAgree}
					disagreeText='Cancel'
					onDisagree={toggleOff}
				/>
			</MenuItem>
		);
	}
);
