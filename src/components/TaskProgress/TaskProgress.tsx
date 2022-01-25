import React, { FC } from "react";
import { TaskProgressWithGroup } from "../../models/TasksProgress";
import { ClassNameComponent } from "../../interfaces/common";
import { ProgressBar } from "../../ui/ProgressBar";

interface TaskProgressComponent
	extends ClassNameComponent,
		TaskProgressWithGroup {}

export const TaskProgress: FC<TaskProgressComponent> = ({
	completedCount,
	totalCount,
	className,
	name,
	mainColor,
	secondColor,
}) => {
	return (
		<ProgressBar
			className={className}
			currentValue={completedCount}
			maxValue={totalCount}
			ariaText={`Progress of ${name} tasks is ${completedCount}`}
			progressbarBGColor={secondColor}
			progressbarColor={mainColor}
		>
			{name}
		</ProgressBar>
	);
};
