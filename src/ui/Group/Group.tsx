import React, { memo, CSSProperties } from "react";
import classNames from "classnames";
import { ClassNameComponent } from "../../interfaces/common";

import GroupStyle from "./Group.module.css";
import { TaskGroup } from "../../models/Group";

interface GroupComponent extends ClassNameComponent, TaskGroup {}

export const Group = memo(
	({ className, name, mainColor, secondColor }: GroupComponent) => {
		const groupStyle: CSSProperties = {
			backgroundColor: secondColor,
			color: mainColor,
		};
		return (
			<span
				className={classNames(GroupStyle.group, className)}
				style={groupStyle}
			>
				{name}
			</span>
		);
	}
);
