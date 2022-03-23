import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/ui/Card";
import { Avatar } from "@/ui/Avatar";
import { ClassNameProps } from "@/interfaces/common";
import { Activities, ActivityStructure } from "@/models/Activities/types";
import { Color } from "@/interfaces/ui";
import { Text } from "@/ui/Text";
import { DateTime } from "@/ui/DateTime";
import { DeleteIcon } from "@/ui/DeleteIcon";
import { EditIcon } from "@/ui/EditIcon";
import { PlusIcon } from "@/ui/PlusIcon";

import ActivityCardStyle from "./ActivityCard.module.css";

interface ActivityCardProps extends ClassNameProps, ActivityStructure {}

const colorMap: Record<Activities, Color> = {
	Created: "success",
	Deleted: "error",
	Edited: "warning",
};

const iconMap: Record<Activities, ReactNode> = {
	Created: <PlusIcon className={ActivityCardStyle.icon} />,
	Deleted: <DeleteIcon className={ActivityCardStyle.icon} />,
	Edited: <EditIcon className={ActivityCardStyle.icon} />,
};

export const ActivityCard: FC<ActivityCardProps> = ({
	activity,
	sphere,
	activist,
	className,
	date,
}) => {
	const { t } = useTranslation("room");
	return (
		<Card className={classNames(ActivityCardStyle.card, className)}>
			<Avatar
				className={ActivityCardStyle.avatar}
				size="medium"
				alt={t(`activities.activityType.${activity}`)}
				color={colorMap[activity]}
			>
				{iconMap[activity]}
			</Avatar>
			<Text component="p">
				{t("activities.text", {
					activist,
					activity,
					sphere,
				})}
			</Text>

			<DateTime date={date} format="MMM DD" />
		</Card>
	);
};
