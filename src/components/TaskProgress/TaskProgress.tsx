import React, { FC } from "react";
import { TaskProgressStructure } from "@/models/Progress/types";
import { ClassNameProps } from "@/interfaces/common";
import { ProgressBar } from "@/ui/ProgressBar";
import { useGroup } from "@/hooks/useGroup";

interface TaskProgressComponent extends ClassNameProps, TaskProgressStructure {}

export const TaskProgress: FC<TaskProgressComponent> = ({
	completedCount,
	totalCount,
	className,
	groupId,
}) => {
	const group = useGroup(groupId);

	if (!group) {
		return null;
	}

	const { mainColor, name, secondColor } = group;

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
