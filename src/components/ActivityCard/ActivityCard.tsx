import classNames from "classnames";
import React, { FC } from "react";
import { Card } from "@/ui/Card";
import { Avatar } from "@/ui/Avatar";
import { ClassNameProps } from "@/interfaces/common";
import { Activities, ActivityStructure } from "@/models/Activities/types";
import { Color } from "@/interfaces/ui";
import { Text } from "@/ui/Text";

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
}) => {
	return (
		<Card className={classNames(ActivityCardStyle.card, className)}>
			<Avatar size="medium" alt={activity} color={colorMap[activity]} />
			<Text component="p">
				Task had been <b>{activity}</b>
			</Text>
		</Card>
	);
};
