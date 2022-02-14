import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "../../interfaces/common";

import ListItemStyle from "./ListItem.module.css";

export const ListItem: FC<ClassNameProps> = ({ children, className }) => {
	return (
		<li className={classNames(ListItemStyle.item, className)}>{children}</li>
	);
};
