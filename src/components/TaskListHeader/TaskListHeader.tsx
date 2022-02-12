import classNames from "classnames";
import React, { FC } from "react";
import { GET_PARAMS, POPUPS } from "../../const";
import { usePrepareLink } from "../../hooks";
import { ClassNameProps, ExtractProps } from "../../interfaces/common";
import { EditMenu } from "../../ui/EditMenu";
import { Text } from "../../ui/Text";

import TaskListHeaderStyle from "./TaskListHeader.module.css";

interface TaskListHeaderComponent extends ClassNameProps {
	readonly columnName: string;
}

type EditMenuContent = ExtractProps<typeof EditMenu>["content"];

export const TaskListHeader: FC<TaskListHeaderComponent> = ({
	children,
	className,
	columnName,
}) => {
	const editFormLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.task,
			[GET_PARAMS.taskStatus]: columnName,
		},
	});
	const editMenu: EditMenuContent = [
		{
			label: "New Task",
			to: editFormLink,
		},
	];

	return (
		<>
			<header className={classNames(TaskListHeaderStyle.header, className)}>
				<Text component="h2">{children}</Text>
				<EditMenu className={TaskListHeaderStyle.editMenu} content={editMenu} />
			</header>
		</>
	);
};
