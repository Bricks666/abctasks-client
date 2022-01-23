import classNames from "classnames";
import dayjs from "dayjs";
import React, { FC } from "react";
import { ClassNameComponent } from "../../interfaces/common";
import { TaskStructure } from "../../models/Tasks";
import { Group } from "../../ui/Group";
import { Picture } from "../../ui/Picture";

import TaskCardStyle from "./TaskCard.module.css";

interface TaskCardComponent extends ClassNameComponent, TaskStructure {}

export const TaskCard: FC<TaskCardComponent> = ({
	className,
	group,
	content,
	commentCount,
	addedDate,
	author,
}) => {
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
};
