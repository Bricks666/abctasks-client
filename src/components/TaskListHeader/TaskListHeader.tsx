import classNames from "classnames";
import React, { FC } from "react";
import { GET_PARAMS, POPUPS } from "@/const";
import { usePrepareLink } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { EditMenu } from "../EditMenu";
import { Text } from "@/ui/Text";
import { Block } from "@/ui/Block";
import { MenuOption } from "@/ui/MenuItem";
import { useTranslation } from "react-i18next";

import TaskListHeaderStyle from "./TaskListHeader.module.css";

interface TaskListHeaderComponent extends ClassNameProps {
	readonly columnName: string;
}

export const TaskListHeader: FC<TaskListHeaderComponent> = ({
	children,
	className,
	columnName,
}) => {
	const { t } = useTranslation("room");
	const editFormLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.createTask,
			[GET_PARAMS.taskStatus]: columnName,
		},
	});
	const options: MenuOption[] = [
		{
			label: t("menus.addTask"),
			to: editFormLink,
		},
	];

	return (
		<>
			<header className={classNames(TaskListHeaderStyle.header, className)}>
				<Block className={TaskListHeaderStyle.background}>
					<Text component="h3">{children}</Text>
					<EditMenu
						className={TaskListHeaderStyle.editMenu}
						options={options}
						alt="Open tasks list's edit menu"
					/>
				</Block>
			</header>
		</>
	);
};
