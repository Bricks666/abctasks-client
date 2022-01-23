import React, { FC } from "react";
import { TaskProgressStructure } from "../../models/TasksProgress";
import { OnlyClassName } from "../../interfaces/common";
import { ProgressBar } from "../../ui/ProgressBar";

interface TaskProgressComponent extends OnlyClassName, TaskProgressStructure {}

export const TaskProgress: FC<TaskProgressComponent> = ({
	completedCount,
	totalCount,
	className,
	group,
}) => {
	return (
		<ProgressBar
			className={className}
			currentValue={completedCount}
			maxValue={totalCount}
		>
			{group.group}
		</ProgressBar>
	);
};
