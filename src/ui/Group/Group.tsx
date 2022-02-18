import React, { memo, CSSProperties } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { TaskGroup } from "@/models/Tasks/types";
import { Text } from "../Text";

import GroupStyle from "./Group.module.css";

interface GroupComponent extends ClassNameProps, TaskGroup {}

export const Group = memo(
	({ className, name, mainColor, secondColor }: GroupComponent) => {
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
	}
);
