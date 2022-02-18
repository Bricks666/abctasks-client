import React, { FC } from "react";
import { TaskProgressWithGroup } from "@/models/Tasks/types";
import { ClassNameProps } from "@/interfaces/common";
import { ProgressBar } from "@/ui/ProgressBar";

interface TaskProgressComponent
	extends ClassNameProps,
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
