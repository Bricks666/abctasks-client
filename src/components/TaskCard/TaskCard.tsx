import React, { FC } from "react";
import { GET_PARAMS, POPUPS } from "@/const";
import { usePrepareLink } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { deleteTask } from "@/models/Tasks";
import { TaskStructure } from "@/models/Tasks/types";
import { EditMenu } from "../EditMenu";
import { Group } from "@/ui/Group";
import { MenuOption } from "@/ui/MenuItemList";
import { DateTime } from "@/ui/DateTime";
import { useGroup } from "@/hooks/useGroup";
import { useTranslation } from "react-i18next";

import TaskCardStyle from "./TaskCard.module.css";
import {
	Avatar,
	Box,
	CardContent,
	CardHeader,
	SxProps,
	Typography,
} from "@mui/material";
import { Block } from "@/ui/Block";
import { Card } from "@/ui/Card";

interface TaskCardComponent extends ClassNameProps, TaskStructure {}

export const TaskCard: FC<TaskCardComponent> = ({
	className,
	groupId,
	content,
	commentCount,
	addedDate,
	author,
	id,
	roomId,
}) => {
	const { t } = useTranslation("room");
	const editLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.editTask,
			[GET_PARAMS.taskId]: id.toString(),
		},
	});
	const options: MenuOption[] = [
		{
			label: t("menus.editTask"),
			to: editLink,
		},
		{
			label: t("menus.deleteTask"),
			onClick: () => deleteTask({ id, roomId }),
		},
	];
	const group = useGroup(groupId);
	if (!group) {
		return null;
	}

	return (
		<Card className={className}>
			<CardHeader
				className={TaskCardStyle.header}
				action={
					<EditMenu
						options={options}
						size="small"
						alt="Open task's edit menu "
					/>
				}
				titleTypographyProps={{
					component: Group,
					...group,
					fontSize: "inherit",
				}}
				title={""}
				component="header"
			/>

			<CardContent component="main">
				<Typography sx={contentSx}>{content}</Typography>
			</CardContent>
			<Box component="footer" sx={cardAdditionInfo}>
				<DateTime date={addedDate} format={"MMM DD"} />
				<Typography component="span" variant="body2">
					{commentCount}
				</Typography>
				<Avatar
					src={author.photo || ""}
					alt={author.name}
					component="div"
					sx={avatar}
				>
					{author.name[0]?.toUpperCase()}
				</Avatar>
			</Box>
		</Card>
	);
};

const cardAdditionInfo: SxProps = {
	display: "flex",
	columnGap: "1rem",
	color: "#636568",
	fontSize: "12px",
	alignItems: "center",
};
const avatar: SxProps = {
	marginLeft: "auto",
	width: "24px",
	height: "24px",
};

const contentSx: SxProps = {
	wordBreak: "break-all",
};
