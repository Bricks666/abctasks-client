import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { TaskStatus } from '@/shared/api';
import { routes, getParams, popups } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface TaskColumnActionsProps extends CommonProps {
	readonly columnStatus: TaskStatus;
	readonly roomId: number;
}

export const TaskColumnActions: React.FC<TaskColumnActionsProps> = React.memo(
	(props) => {
		const { className, columnStatus, roomId, } = props;

		return (
			<IconButton
				className={className}
				to={routes.room as any}
				params={{ id: roomId, }}
				query={{
					[getParams.popup]: popups.createTask,
					[getParams.taskStatus]: columnStatus,
				}}
				component={Link}>
				<AddIcon />
			</IconButton>
		);
	}
);
