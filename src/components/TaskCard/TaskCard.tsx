import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { GET_PARAMS, POPUPS } from '@/const';
import { deleteTask } from '@/models/Tasks';
import { TaskStructure } from '@/models/Tasks/types';
import { Avatar } from '@/ui/Avatar';
import { Card } from '@/ui/Card';
import { CardHeader } from '@/ui/CardHeader';
import { EditMenu } from '../EditMenu';
import { Group } from '@/ui/Group';
import { Text } from '@/ui/Text';
import { MenuOption } from '@/ui/MenuItem';
import { DateTime } from '@/ui/DateTime';
import { useGroup } from '@/hooks/useGroup';
import { CommonProps } from '@/interfaces/common';
import { usePrepareLink } from '@/hooks';

import TaskCardStyle from './TaskCard.module.css';

export interface TaskCardComponent extends CommonProps, TaskStructure {}

export const TaskCard: React.FC<TaskCardComponent> = ({
	className,
	groupId,
	content,
	commentCount,
	addedDate,
	author,
	id,
	roomId,
}) => {
	const { t } = useTranslation('room');
	const editLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.editTask,
			[GET_PARAMS.taskId]: id.toString(),
		},
	});
	const options: MenuOption[] = [
		{
			label: t('menus.editTask'),
			to: editLink,
		},
		{
			label: t('menus.deleteTask'),
			onClick: () => deleteTask({ id, roomId }),
		},
	];
	const group = useGroup(groupId);
	if (!group) {
		return null;
	}

	return (
		<Card className={cn(TaskCardStyle.card, className)}>
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

			<Text className={TaskCardStyle.content}>{content}</Text>
			<div className={TaskCardStyle.additionInfo}>
				<DateTime date={addedDate} format='MMM DD' />
				<Text component='span'>{commentCount}</Text>
				<Avatar
					className={TaskCardStyle.avatar}
					size='small'
					src={author.photo}
					alt={author.name}>
					{author.name[0]?.toUpperCase()}
				</Avatar>
			</div>
		</Card>
	);
};
