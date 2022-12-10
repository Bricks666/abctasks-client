import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { roomRoute } from '@/shared/configs';
import { getParams, popups } from '@/shared/const';
import { TaskStatus } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import { EditMenu, MenuOption } from '@/shared/ui';
import styles from './TaskListHeader.module.css';

export interface TaskListHeaderComponent extends CommonProps {
	readonly columnStatus: TaskStatus;
	readonly roomId: number;
}

export const TaskListHeader: React.FC<
	React.PropsWithChildren<TaskListHeaderComponent>
> = (props) => {
	const { children, className, columnStatus, roomId, } = props;
	const { t, } = useTranslation('common');

	const options = React.useMemo<MenuOption<any>[]>(
		() => [
			{
				icon: <AddIcon />,
				label: t('actions.create'),
				to: roomRoute,
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
		<header className={cn(styles.header, className)}>
			<Typography className={styles.title} variant='h6' component='h3'>
				{children}
			</Typography>
			<EditMenu options={options} alt="Open tasks list's edit menu" />
		</header>
	);
};
