import * as React from 'react';
import cn from 'classnames';
import { useMutation } from '@farfetched/react';
import { deleteRoomMutation, Room } from '@/models/rooms';
import { Card } from '@/ui/Card';
import { CardHeader } from '@/ui/CardHeader';
import { List } from '@/ui/List';
import { ListItem } from '@/ui/ListItem';
import { EditMenu } from '@/components/EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { usePrepareLink } from '@/hooks';
import { GET_PARAMS, POPUPS } from '@/const';
import { Button } from '@/ui/Button';
import { CommonProps } from '@/interfaces/common';

import styles from './RoomCard.module.css';

export interface RoomCardProps extends CommonProps, Room {}

export const RoomCard: React.FC<RoomCardProps> = ({
	id,
	name,
	className,
	description,
}) => {
	const deleteRoom = useMutation(deleteRoomMutation);
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
				onClick: () => deleteRoom.start(id),
			},
		],
		[editLink, id]
	);
	return (
		<Card className={cn(styles.card, className)}>
			<CardHeader
				className={styles.header}
				secondaryAction={<EditMenu options={options} />}>
				{name}
			</CardHeader>
			<List>
				<ListItem>Описание: {description}</ListItem>
			</List>
			<Button type='text' to={`${id}`}>
				Перейти
			</Button>
		</Card>
	);
};
