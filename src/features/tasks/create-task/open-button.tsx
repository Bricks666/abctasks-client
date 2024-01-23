import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TaskStatus } from '@/shared/api';
import { routes, getParams, popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface OpenCreateTaskButtonProps extends CommonProps {
	readonly roomId: number;
	readonly columnStatus?: TaskStatus;
}

export const OpenCreateTaskButton: React.FC<OpenCreateTaskButtonProps> =
	React.memo((props) => {
		const { className, columnStatus, roomId, } = props;
		const { t, } = useTranslation('tasks');
		const label = t('actions.create_task.actions.open');

		return (
			<Tooltip title={label}>
				<IconButton
					className={className}
					to={routes.room.tasks as any}
					params={{ id: roomId, }}
					query={{
						[getParams.popup]: popupsMap.createTask,
						[getParams.taskStatus]: columnStatus,
					}}
					component={Link}>
					<AddIcon />
				</IconButton>
			</Tooltip>
		);
	});
