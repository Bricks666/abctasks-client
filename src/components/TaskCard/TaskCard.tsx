import classNames from "classnames";
import dayjs from "dayjs";
import React, { FC, memo } from "react";
import { ClassNameComponent } from "../../interfaces/common";
import { TaskWithGroup } from "../../models/Tasks";
import { Group } from "../../ui/Group";
import { Picture } from "../../ui/Picture";

import TaskCardStyle from "./TaskCard.module.css";

interface TaskCardComponent extends ClassNameComponent, TaskWithGroup {}

export const TaskCard: FC<TaskCardComponent> = memo(
	({ className, group, content, commentCount, addedDate, author }) => {
		return (
			<article className={classNames(TaskCardStyle.card, className)}>
				<Group {...group} />
				<p className={TaskCardStyle.content}>{content}</p>
				{/* Возможно стоит вынести в отдельный компонент */}
				<div className={TaskCardStyle.additionInfo}>
					<time dateTime={addedDate}>{dayjs(addedDate).format("MMM DD")}</time>
					<span>{commentCount}</span>
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
