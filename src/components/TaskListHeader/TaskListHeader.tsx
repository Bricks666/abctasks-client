import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { GET_PARAMS, POPUPS } from '@/const';
import { usePrepareLink } from '@/hooks';
import { CommonProps } from '@/interfaces/common';
import { EditMenu } from '../EditMenu';
import { Text } from '@/ui/Text';
import { Block } from '@/ui/Block';
import { MenuOption } from '@/ui/MenuItem';
import { TaskStatus } from '@/models/Tasks/types';

import styles from './TaskListHeader.module.css';

export interface TaskListHeaderComponent extends CommonProps {
	readonly columnStatus: TaskStatus;
}

export const TaskListHeader: React.FC<
	React.PropsWithChildren<TaskListHeaderComponent>
> = ({ children, className, columnStatus }) => {
	const { t } = useTranslation('room');
	const editFormLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.createTask,
			[GET_PARAMS.taskStatus]: columnStatus.toString(),
		},
	});
	const options: MenuOption[] = [
		{
			label: t('menus.addTask'),
			to: editFormLink,
		},
	];

	return (
		<header className={className}>
			<Block className={styles.background}>
				<Text component='h3'>{children}</Text>
				<EditMenu
					className={styles.editMenu}
					options={options}
					alt="Open tasks list's edit menu"
				/>
			</Block>
		</header>
	);
};
