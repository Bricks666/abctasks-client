import React, { memo, CSSProperties } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { TaskGroup } from "@/models/Tasks/types";
import { Text } from "../Text";

import GroupStyle from "./Group.module.css";

interface GroupProps extends ClassNameProps, TaskGroup {}

export const Group = memo(function Group({
	className,
	name,
	mainColor,
	secondColor,
}: GroupProps) {
	const groupStyle: CSSProperties = {
		backgroundColor: secondColor,
		color: mainColor,
	};
	return (
		<Text
			className={classNames(GroupStyle.group, className)}
			cssStyles={groupStyle}
			component="span"
		>
			{name}
		</Text>
	);
});
