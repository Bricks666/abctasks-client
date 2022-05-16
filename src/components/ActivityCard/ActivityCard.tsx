import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/ui/Card";
import { ClassNameProps } from "@/interfaces/common";
import { Activities, ActivityStructure } from "@/models/Activities/types";
import { DateTime } from "@/ui/DateTime";
import { Delete, Edit, Add } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";

interface ActivityCardProps extends ClassNameProps, ActivityStructure {}

const colorMap: Record<Activities, string> = {
	[Activities.CREATE]: "var(--success)",
	[Activities.DELETE]: "var(--error)",
	[Activities.EDIT]: "var(--warning)",
};

const iconMap: Record<Activities, ReactNode> = {
	[Activities.CREATE]: <Add />,
	[Activities.DELETE]: <Delete />,
	[Activities.EDIT]: <Edit />,
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
		<Card className={className}>
			<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
				<Avatar
					alt={t(`activities.activityType.${activity}`)}
					sx={{ bgcolor: colorMap[activity] }}
				>
					{iconMap[activity]}
				</Avatar>
				<Typography component="p" variant="body2">
					{t("activities.text", {
						activist,
						activity,
						sphere,
					})}
				</Typography>
			</Stack>
			<DateTime date={date} format="MMM DD" />
		</Card>
	);
};
