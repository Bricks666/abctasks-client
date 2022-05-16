import classNames from "classnames";
import React, { FC } from "react";
import { GET_PARAMS, POPUPS } from "@/const";
import { usePrepareLink } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { EditMenu } from "../EditMenu";
import { MenuOption } from "@/ui/MenuItemList";
import { useTranslation } from "react-i18next";
import { TaskStatus } from "@/models/Tasks/types";
import { Paper, Typography } from "@mui/material";

import TaskListHeaderStyle from "./TaskListHeader.module.css";

interface TaskListHeaderComponent extends ClassNameProps {
	readonly columnStatus: TaskStatus;
}

export const TaskListHeader: FC<TaskListHeaderComponent> = ({
	children,
	className,
	columnStatus,
}) => {
	const { t } = useTranslation("room");
	const editFormLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.createTask,
			[GET_PARAMS.taskStatus]: columnStatus.toString(),
		},
	});
	const options: MenuOption[] = [
		{
			label: t("menus.addTask"),
			to: editFormLink,
		},
	];

	return (
		<Paper
			className={classNames(TaskListHeaderStyle.header, className)}
			component="header"
			elevation={0}
		>
			<Typography component="h3" variant="h5">
				{children}
			</Typography>
			<EditMenu options={options} alt="Open tasks list's edit menu" />
		</Paper>
	);
};
