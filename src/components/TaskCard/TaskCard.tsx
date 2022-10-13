import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@farfetched/react';
import { GET_PARAMS, POPUPS } from '@/const';
import { removeTaskMutation, Task } from '@/models/tasks';
import { Card } from '@/ui/Card';
import { CardHeader } from '@/ui/CardHeader';
import { EditMenu } from '../EditMenu';
import { Group } from '@/ui/Group';
import { Text } from '@/ui/Text';
import { MenuOption } from '@/ui/MenuItem';
import { DateTime } from '@/ui/DateTime';
import { useGroupsMap, usePrepareLink } from '@/hooks';
import { CommonProps } from '@/types/common';

import styles from './TaskCard.module.css';

export interface TaskCardProps extends CommonProps, Task {}

export const TaskCard: React.FC<TaskCardProps> = ({
	className,
	content,
	groupId,
	createdAt,
	id,
	roomId,
}) => {
	const { t } = useTranslation('room');
	const removeTask = useMutation(removeTaskMutation);
	const editLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.updateTask,
			[GET_PARAMS.taskId]: id.toString(),
		},
	});
	const options: MenuOption[] = React.useMemo(
		() => [
			{
				label: t('menus.editTask'),
				to: editLink,
			},
			{
				label: t('menus.removeTask'),
				onClick: () => removeTask.start({ id, roomId }),
			},
		],
		[editLink, id, roomId]
	);
	const { data: groups } = useGroupsMap(roomId);
	const group = groups[groupId];

	if (!group) {
		return null;
	}

	return (
		<Card className={cn(styles.card, className)}>
			<CardHeader
				secondaryAction={
					<EditMenu
						options={options}
						size='small'
						alt="Open task's edit menu "
					/>
				}>
				<Group {...group} />
			</CardHeader>

			<Text>{content}</Text>
			<div>
				<DateTime date={createdAt} format='MMM DD' />
				<Text component='span'>0</Text>
			</div>
		</Card>
	);
};
