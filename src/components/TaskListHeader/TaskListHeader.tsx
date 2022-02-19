import classNames from "classnames";
import React, { FC } from "react";
import { GET_PARAMS, POPUPS } from "@/const";
import { usePrepareLink } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { EditMenu } from "../EditMenu";
import { Text } from "@/ui/Text";
import { Block } from "@/ui/Block";
import { MenuOption } from "@/ui/Menu";

import TaskListHeaderStyle from "./TaskListHeader.module.css";
import { DotsIcon } from "@/ui/DotsIcon";

interface TaskListHeaderComponent extends ClassNameProps {
	readonly columnName: string;
}

export const TaskListHeader: FC<TaskListHeaderComponent> = ({
	children,
	className,
	columnName,
}) => {
	const editFormLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.createTask,
			[GET_PARAMS.taskStatus]: columnName,
		},
	});
	const options: MenuOption[] = [
		{
			label: "New Task",
			to: editFormLink,
      icon: <DotsIcon />
		},
	];

	return (
		<>
			<header className={classNames(TaskListHeaderStyle.header, className)}>
				<Block className={TaskListHeaderStyle.background}>
					<Text component="h2">{children}</Text>
					<EditMenu
						className={TaskListHeaderStyle.editMenu}
						options={options}
					/>
				</Block>
			</header>
		</>
	);
};
