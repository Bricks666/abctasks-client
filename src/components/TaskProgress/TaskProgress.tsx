import React, { FC } from "react";
import { TaskProgressStructure } from "@/models/Progress/types";
import { ClassNameProps } from "@/interfaces/common";
import { ProgressBar } from "@/ui/ProgressBar";
import { useGroup } from "@/hooks/useGroup";
import { useTranslation } from "react-i18next";

interface TaskProgressComponent extends ClassNameProps, TaskProgressStructure {}

export const TaskProgress: FC<TaskProgressComponent> = ({
	completedCount,
	totalCount,
	className,
	groupId,
}) => {
	const { t } = useTranslation("homepage");
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
			ariaText={t("taskProgress.progressAria", {
				name: name,
				completed: completedCount,
			})}
			progressbarBGColor={secondColor}
			progressbarColor={mainColor}
		>
			{name}
		</ProgressBar>
	);
};
