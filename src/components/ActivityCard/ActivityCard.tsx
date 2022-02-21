import classNames from "classnames";
import React, { FC } from "react";
import { Card } from "@/ui/Card";
import { Avatar } from "@/ui/Avatar";
import { ClassNameProps } from "@/interfaces/common";
import { Activities, ActivityStructure } from "@/models/Activities/types";
import { Color } from "@/interfaces/ui";
import { Text } from "@/ui/Text";
import { DateTime } from "@/ui/DateTime";

import ActivityCardStyle from "./ActivityCard.module.css";

interface ActivityCardProps extends ClassNameProps, ActivityStructure {}

const colorMap: Record<Activities, Color> = {
	Creating: "success",
	Deleting: "error",
	Editing: "warning",
};

export const ActivityCard: FC<ActivityCardProps> = ({
	activity,
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
			/>
			<Text component="p">
				Task had been <b>{activity}</b>
			</Text>

			<DateTime date={date} format="MMM DD" />
		</Card>
	);
};
