import React, { FC, useMemo } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Room } from "@/models/Rooms/types";
import { EditMenu } from "@/components/EditMenu";
import { MenuOption } from "@/ui/MenuItemList";
import { usePrepareLink } from "@/hooks";
import { GET_PARAMS, POPUPS } from "@/const";
import { deleteRoom } from "@/models/Rooms";
import {
	Button,
	CardActions,
	CardContent,
	CardHeader,
	List,
	ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Card } from "@/ui/Card";

interface RoomCardProps extends ClassNameProps, Room {}

export const RoomCard: FC<RoomCardProps> = ({
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
	const options = useMemo<MenuOption[]>(
		() => [
			{
				label: "Edit",
				to: editLink,
			},
			{
				label: "Delete",
				onClick: () => deleteRoom(id),
			},
		],
		[editLink, id]
	);
	return (
		<Card className={className}>
			<CardHeader
				action={<EditMenu options={options} />}
				component="header"
				title={name}
			/>
			<CardContent component="main">
				<List>
					<ListItem>Описание: {description}</ListItem>
					<ListItem>Количество задач: {taskCount}</ListItem>
					<ListItem>Выполненных задач: {doneTaskCount}</ListItem>
					<ListItem>Активности: {activitiesCount}</ListItem>
					<ListItem>Пользователи: {usersCount}</ListItem>
				</List>
			</CardContent>
			<CardActions>
				<Button variant="text" component={Link} to={`${id}`}>
					Перейти
				</Button>
			</CardActions>
		</Card>
	);
};
