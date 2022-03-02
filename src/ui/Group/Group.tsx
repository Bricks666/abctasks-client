import React, { memo, CSSProperties } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { Text } from "../Text";

import GroupStyle from "./Group.module.css";
import { TaskGroup } from "@/models/Groups/types";

interface GroupProps extends ClassNameProps, TaskGroup {}

export const Group = memo(function Group({
	className,
	mainColor,
	name,
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
