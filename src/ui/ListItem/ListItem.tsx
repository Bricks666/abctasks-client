import classNames from "classnames";
import React, { AriaRole, FC } from "react";
import { ClassNameProps } from "@/interfaces/common";

import ListItemStyle from "./ListItem.module.css";

interface ListItemProps extends ClassNameProps {
	readonly role?: AriaRole;
	readonly tabIndex?: number;
}

export const ListItem: FC<ListItemProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<li className={classNames(ListItemStyle.item, className)} {...props}>
			{children}
		</li>
	);
};
