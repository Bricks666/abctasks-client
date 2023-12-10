import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, MenuItem } from '@mui/material';
import { RouteInstance } from 'atomic-router';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { routes, getParams, popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface OpenUpdateTaskFormMenuItemProps extends CommonProps {
	readonly roomId: number;
	readonly taskId: number;
}

export const OpenUpdateTaskFormMenuItem: React.FC<OpenUpdateTaskFormMenuItemProps> =
	React.memo((props) => {
		const { className, taskId, roomId, } = props;
		const { t, } = useTranslation('tasks');

		const label = t('actions.update_task.actions.open');

		return (
			<MenuItem
				className={className}
				to={routes.room.tasks as RouteInstance<any>}
				params={{
					id: roomId,
				}}
				query={{
					[getParams.popup]: popupsMap.updateTask,
					[getParams.taskId]: taskId,
				}}
				component={Link}>
				<ListItemIcon>
					<EditIcon />
				</ListItemIcon>
				{label}
			</MenuItem>
		);
	});
