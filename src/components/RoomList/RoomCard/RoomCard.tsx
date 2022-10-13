import * as React from 'react';
import cn from 'classnames';
import { useMutation } from '@farfetched/react';
import { removeRoomMutation, Room } from '@/models/rooms';
import { Card } from '@/ui/Card';
import { CardHeader } from '@/ui/CardHeader';
import { List } from '@/ui/List';
import { ListItem } from '@/ui/ListItem';
import { EditMenu } from '@/components/EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { usePrepareLink } from '@/hooks';
import { GET_PARAMS, POPUPS } from '@/const';
import { Button } from '@/ui/Button';
import { CommonProps } from '@/types/common';

import styles from './RoomCard.module.css';

export interface RoomCardProps extends CommonProps, Room {}

export const RoomCard: React.FC<RoomCardProps> = ({
	id,
	name,
	className,
	description,
}) => {
	const removeRoom = useMutation(removeRoomMutation);
	const editLink = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.updateRoom,
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
				onClick: () => removeRoom.start(id),
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
