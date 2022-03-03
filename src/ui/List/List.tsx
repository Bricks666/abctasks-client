import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";

import ListStyle from "./List.module.css";

interface ListProps extends ClassNameProps {
	readonly dense?: boolean;
}

export const List: FC<ListProps> = ({ className, dense, children }) => {
	const classes = classNames(
		ListStyle.list,
		{
			[ListStyle.dense]: dense,
		},
		className
	);
	return <ul className={classes}>{children}</ul>;
};
