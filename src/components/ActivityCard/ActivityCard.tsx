import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import { Card } from "@/ui/Card";
import { Avatar } from "@/ui/Avatar";
import { ClassNameProps } from "@/interfaces/common";
import {
	Activities,
	ActivitySphere,
	ActivityStructure,
} from "@/models/Activities/types";
import { Color } from "@/interfaces/ui";
import { Text } from "@/ui/Text";
import { DateTime } from "@/ui/DateTime";
import { DeleteIcon } from "@/ui/DeleteIcon";
import { EditIcon } from "@/ui/EditIcon";

import ActivityCardStyle from "./ActivityCard.module.css";

interface ActivityCardProps extends ClassNameProps, ActivityStructure {}

const colorMap: Record<Activities, Color> = {
	Created: "success",
	Deleted: "error",
	Edited: "warning",
};

const iconMap: Record<Activities, ReactNode> = {
	Created: null,
	Deleted: <DeleteIcon className={ActivityCardStyle.icon} />,
	Edited: <EditIcon className={ActivityCardStyle.icon} />,
};

const generateText = (
	activist: string,
	sphere: ActivitySphere,
	activity: Activities
) => {
	return `${activist} has ${activity.toLowerCase()} ${sphere.toLowerCase()}`;
};

export const ActivityCard: FC<ActivityCardProps> = ({
	activity,
	sphere,
	activist,
	className,
	date,
}) => {
	return (
		<Card className={classNames(ActivityCardStyle.card, className)}>
			<Avatar
				className={ActivityCardStyle.avatar}
				size="medium"
				alt={activity}
				color={colorMap[activity]}
			>
				{iconMap[activity]}
			</Avatar>
			<Text component="p">{generateText(activist, sphere, activity)}</Text>

			<DateTime date={date} format="MMM DD" />
		</Card>
	);
};
