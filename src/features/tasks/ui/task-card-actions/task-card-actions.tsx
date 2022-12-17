import { useMutation } from '@farfetched/react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { routes, getParams, popups } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { MenuOption, EditMenu } from '@/shared/ui';
import { removeTaskModel } from '../../model';

export interface TaskCardActionsProps extends CommonProps {
	readonly roomId: number;
	readonly taskId: number;
}

export const TaskCardActions: React.FC<TaskCardActionsProps> = (props) => {
	const { className, taskId, roomId, } = props;
	const { t, } = useTranslation('common');
	const removeTask = useMutation(removeTaskModel.removeTaskMutation);

	const options = React.useMemo<MenuOption<any>[]>(
		() => [
			{
				icon: <EditIcon />,
				label: t('actions.update'),
				to: routes.room,
				params: {
					id: roomId,
				},
				query: {
					[getParams.popup]: popups.updateTask,
					[getParams.taskId]: taskId,
				},
			},
			{
				icon: <DeleteIcon />,
				label: t('actions.remove'),
				onClick: () => removeTask.start({ id: taskId, roomId, }),
			}
		],
		[taskId, roomId]
	);

	return (
		<EditMenu
			className={className}
			options={options}
			size='small'
			alt="Open task's edit menu "
		/>
	);
};
