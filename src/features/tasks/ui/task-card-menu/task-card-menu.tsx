import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { routes, getParams, popups } from '@/shared/configs';
import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { MenuOption, EditMenu, Confirm } from '@/shared/ui';
import { removeTaskModel } from '../../model';

export interface TaskCardMenuProps extends CommonProps {
	readonly roomId: number;
	readonly taskId: number;
}

export const TaskCardMenu: React.FC<TaskCardMenuProps> = React.memo((props) => {
	const { className, taskId, roomId, } = props;
	const { t, } = useTranslation('common');
	const removeTask = useUnit(removeTaskModel.mutation);
	const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

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
				onClick: toggleOn,
			}
		],
		[taskId, roomId]
	);

	const onAgree = React.useCallback(() => {
		removeTask.start({ id: taskId, roomId, });
		toggleOff();
	}, [toggleOff, taskId, roomId]);

	return (
		<>
			<EditMenu
				className={className}
				options={options}
				size='small'
				alt="Open task's edit menu "
			/>
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
		</>
	);
});
