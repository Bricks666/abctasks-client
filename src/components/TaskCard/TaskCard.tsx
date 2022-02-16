import classNames from "classnames";
import dayjs from "dayjs";
import React, { FC, memo } from "react";
import { GET_PARAMS, POPUPS } from "../../const";
import { usePrepareLink } from "../../hooks";
import { ClassNameProps } from "../../interfaces/common";
import { TaskWithGroup } from "../../models/Tasks";
import { Avatar } from "../../ui/Avatar";
import { Card } from "../../ui/Card";
import { EditMenu } from "../../ui/EditMenu";
import { Group } from "../../ui/Group";
import { Text } from "../../ui/Text";

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
		const manipulations = [
			{
				label: "Edit",
				to: editLink,
			},
		];
		return (
			<Card className={classNames(TaskCardStyle.card, className)}>
				<Group {...group} />
				<EditMenu content={manipulations} />
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
