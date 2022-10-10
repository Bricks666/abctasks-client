import * as React from 'react';
import cn from 'classnames';
import { Room } from '@/models/Rooms/types';
import { Card } from '@/ui/Card';
import { CardHeader } from '@/ui/CardHeader';
import { List } from '@/ui/List';
import { ListItem } from '@/ui/ListItem';
import { EditMenu } from '@/components/EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { usePrepareLink } from '@/hooks';
import { GET_PARAMS, POPUPS } from '@/const';
import { deleteRoom } from '@/models/Rooms';
import { Button } from '@/ui/Button';
import { CommonProps } from '@/interfaces/common';

import RoomCardStyle from './RoomCard.module.css';

export interface RoomCardProps extends CommonProps, Room {}

export const RoomCard: React.FC<RoomCardProps> = ({
	id,
	name,
	className,
	activitiesCount,
	description,
	doneTaskCount,
	taskCount,
	usersCount,
}) => {
	const editLink = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.editRoom,
			[GET_PARAMS.roomId]: id,
		},
	});
	const options = React.useMemo<MenuOption[]>(
		() => [
			{
				label: 'Edit',
				to: editLink,
			},
			{
				label: 'Delete',
				onClick: () => deleteRoom(id),
			},
		],
		[editLink, id]
	);
	return (
		<Card className={cn(RoomCardStyle.card, className)}>
			<CardHeader
				className={RoomCardStyle.header}
				secondaryAction={<EditMenu options={options} />}>
				{name}
			</CardHeader>
			<List>
				<ListItem>Описание: {description}</ListItem>
				<ListItem>Количество задач: {taskCount}</ListItem>
				<ListItem>Выполненных задач:{doneTaskCount}</ListItem>
				<ListItem>Активности: {activitiesCount}</ListItem>
				<ListItem>Пользователи: {usersCount}</ListItem>
			</List>
			<Button type='text' to={`${id}`}>
				Перейти
			</Button>
		</Card>
	);
};
