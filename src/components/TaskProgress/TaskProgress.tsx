import React, { FC } from "react";
import { TaskProgressStructure } from "../../models/TasksProgress";
import { ClassNameComponent } from "../../interfaces/common";
import { ProgressBar } from "../../ui/ProgressBar";

interface TaskProgressComponent extends ClassNameComponent, TaskProgressStructure {}

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
			ariaText={`Progress of ${group.group} tasks is ${completedCount}`}
			progressbarBGColor={group.backgroundColor}
			progressbarColor={group.textColor}
		>
			{group.group}
		</ProgressBar>
	);
};
