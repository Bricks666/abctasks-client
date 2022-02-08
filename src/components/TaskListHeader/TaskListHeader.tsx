import classNames from "classnames";
import React, { FC } from "react";
import { GET_PARAMS, POPUPS } from "../../const";
import { usePrepareLink } from "../../hooks";
import { ClassNameComponent, ExtractProps } from "../../interfaces/common";
import { EditMenu } from "../../ui/EditMenu";
import { SectionHeader } from "../../ui/SectionHeader";

import TaskListHeaderStyle from "./TaskListHeader.module.css";

interface TaskListHeaderComponent extends ClassNameComponent {
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
			type: "link",
			to: editFormLink,
		},
	];

	return (
		<header className={classNames(TaskListHeaderStyle.header, className)}>
			<SectionHeader>{children}</SectionHeader>
			<EditMenu className={TaskListHeaderStyle.editMenu} content={editMenu} />
		</header>
	);
};
