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
		const { t, } = useTranslation('tasks');
		const removeTask = useUnit(mutation);
		const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

		const onAgree = React.useCallback(() => {
			removeTask.start({ id: taskId, roomId, });
			toggleOff();
		}, [toggleOff, taskId, roomId]);

		const label = t('actions.remove_task.name');
		const title = t('actions.remove_task.title');
		const content = t('actions.remove_task.content');
		const actions = t('actions.remove_task.actions', {
			returnObjects: true,
		}) as Record<string, string>;

		return (
			<MenuItem className={className} onClick={toggleOn}>
				<ListItemIcon>
					<DeleteIcon />
				</ListItemIcon>
				{label}

				<Confirm
					isOpen={toggled}
					onClose={toggleOff}
					title={title}
					content={content}
					agreeText={actions.agree}
					onAgree={onAgree}
					disagreeText={actions.disagree}
					onDisagree={toggleOff}
				/>
			</MenuItem>
		);
	}
);
