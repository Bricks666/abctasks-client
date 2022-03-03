import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";

import ListItemSecondaryActionStyle from "./ListItemSecondaryAction.module.css";

export const ListItemSecondaryAction: FC<ClassNameProps> = ({
	children,
	className,
}) => {
	return (
		<div className={classNames(ListItemSecondaryActionStyle.item, className)}>
			{children}
		</div>
	);
};
