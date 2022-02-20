import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";

import StackStyle from "./Stack.module.css";

interface StackProps extends ClassNameProps {
	readonly direction?: "column" | "row";
}

export const Stack: FC<StackProps> = ({
	children,
	className,
	direction = "column",
}) => {
	const classes = classNames(StackStyle.stack, StackStyle[direction], className);
	return <div className={classes}>{children}</div>;
};
