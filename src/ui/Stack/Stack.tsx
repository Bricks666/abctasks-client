import React, { FC, memo } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";

import StackStyle from "./Stack.module.css";

type Space = "xs" | "s" | "m" | "l" | "xl" | "none";

interface StackProps extends ClassNameProps {
	readonly direction?: "column" | "row";
	readonly space?: Space;
}

export const Stack: FC<StackProps> = memo(function Stack({
	children,
	className,
	direction = "column",
	space = "m",
}) {
	const classes = classNames(
		StackStyle.stack,
		StackStyle[direction],
		StackStyle[space],
		className
	);
	return <div className={classes}>{children}</div>;
});
