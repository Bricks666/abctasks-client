import classNames from "classnames";
import dayjs from "dayjs";
import React, { FC, memo } from "react";
import { GET_PARAMS, POPUPS } from "@/const";
import { usePrepareLink } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { deleteTask } from "@/models/Tasks";
import { TaskWithGroup } from "@/models/Tasks/types";
import { Avatar } from "@/ui/Avatar";
import { Card } from "@/ui/Card";
import { CardHeader } from "@/ui/CardHeader";
import { EditMenu } from "../EditMenu";
import { Group } from "@/ui/Group";
import { Text } from "@/ui/Text";
import { MenuOption } from "@/ui/Menu";

import TaskCardStyle from "./TaskCard.module.css";

interface TaskCardComponent extends ClassNameProps, TaskWithGroup {}

export const TaskCard: FC<TaskCardComponent> = memo(
	({ className, group, content, commentCount, addedDate, author, id }) => {
		const editLink = usePrepareLink({
			query: {
				[GET_PARAMS.popup]: POPUPS.editTask,
				[GET_PARAMS.taskId]: id.toString(),
			},
		});
		const options: MenuOption[] = [
			{
				label: "Edit",
				to: editLink,
			},
			{
				label: "Delete",
				onClick: () => deleteTask(id),
			},
		];

		return (
			<Card className={classNames(TaskCardStyle.card, className)}>
				<CardHeader
					secondaryAction={<EditMenu options={options} size="small" />}
				>
					<Group {...group} />
				</CardHeader>

				<Text className={TaskCardStyle.content}>{content}</Text>
				{/* Возможно стоит вынести в отдельный компонент */}
				<div className={TaskCardStyle.additionInfo}>
					<time dateTime={addedDate}>{dayjs(addedDate).format("MMM DD")}</time>
					<Text component="span">{commentCount}</Text>
					<Avatar
						className={TaskCardStyle.avatar}
						size="small"
						src={author.photo}
						alt={author.name}
					/>
				</div>
			</Card>
		);
	}
);
