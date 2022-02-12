import classNames from "classnames";
import dayjs from "dayjs";
import React, { FC, memo } from "react";
import { ClassNameProps } from "../../interfaces/common";
import { TaskWithGroup } from "../../models/Tasks";
import { Group } from "../../ui/Group";
import { Picture } from "../../ui/Picture";
import { Text } from "../../ui/Text";

import TaskCardStyle from "./TaskCard.module.css";

interface TaskCardComponent extends ClassNameProps, TaskWithGroup {}

export const TaskCard: FC<TaskCardComponent> = memo(
	({ className, group, content, commentCount, addedDate, author }) => {
		return (
			<article className={classNames(TaskCardStyle.card, className)}>
				<Group {...group} />
				<Text className={TaskCardStyle.content}>{content}</Text>
				{/* Возможно стоит вынести в отдельный компонент */}
				<div className={TaskCardStyle.additionInfo}>
					<time dateTime={addedDate}>{dayjs(addedDate).format("MMM DD")}</time>
					<Text component="span">{commentCount}</Text>
					<Picture
						className={TaskCardStyle.image}
						src={author.photo || ""}
						alt={author.name}
						title={author.name}
					/>
				</div>
			</article>
		);
	}
);
