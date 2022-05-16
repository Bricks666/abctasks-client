import React, { memo } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { TaskGroup } from "@/models/Groups/types";
import { Typography } from "@mui/material";

import GroupStyle from "./Group.module.css";

interface GroupProps extends ClassNameProps, TaskGroup {}

export const Group = memo(function Group({
	className,
	mainColor,
	name,
	secondColor,
}: GroupProps) {
	const groupStyle = {
		bgcolor: secondColor,
		color: mainColor,
	};
	return (
		<Typography
			className={classNames(GroupStyle.group, className)}
			sx={groupStyle}
			component="span"
		>
			{name}
		</Typography>
	);
});
