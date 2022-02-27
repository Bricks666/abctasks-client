import React, { memo, CSSProperties } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { Text } from "../Text";
import { useGroup } from "@/hooks/useGroup";

import GroupStyle from "./Group.module.css";

interface GroupProps extends ClassNameProps {
	readonly groupId: number;
}

export const Group = memo(function Group({ className, groupId }: GroupProps) {
	const group = useGroup(groupId);

	if (!group) {
		return null;
	}

	const { mainColor, name, secondColor } = group;

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
