import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskStatus } from '@/shared/api';
import { routes, getParams, popups } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { MenuOption, EditMenu } from '@/shared/ui';

export interface TaskColumnMenuProps extends CommonProps {
	readonly columnStatus: TaskStatus;
	readonly roomId: number;
}

export const TaskColumnMenu: React.FC<TaskColumnMenuProps> = React.memo(
	(props) => {
		const { className, columnStatus, roomId, } = props;
		const { t, } = useTranslation('common');

		const options = React.useMemo<MenuOption<any>[]>(
			() => [
				{
					icon: <AddIcon />,
					label: t('actions.create'),
					to: routes.room,
					params: { id: roomId, },
					query: {
						[getParams.popup]: popups.createTask,
						[getParams.taskStatus]: columnStatus,
					},
				}
			],
			[columnStatus]
		);

		return (
			<EditMenu
				className={className}
				options={options}
				alt="Open tasks list's edit menu"
			/>
		);
	}
);