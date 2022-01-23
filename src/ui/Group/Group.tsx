import React, { memo, CSSProperties } from "react";
import classNames from "classnames";
import { ClassNameComponent, GroupStructure } from "../../interfaces/common";

import GroupStyle from "./Group.module.css";

interface GroupComponent extends ClassNameComponent, GroupStructure {}

export const Group = memo(
	({ className, group, backgroundColor, textColor }: GroupComponent) => {
		const groupStyle: CSSProperties = {
			color: textColor,
			backgroundColor,
		};
		return (
			<span
				className={classNames(GroupStyle.group, className)}
				style={groupStyle}
			>
				{group}
			</span>
		);
	}
);
