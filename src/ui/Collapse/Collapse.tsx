import { ExtractProps } from "@/interfaces/common";
import classNames from "classnames";
import React, { FC } from "react";
import { Transition } from "../Transition";

import CollapseStyle from "./Collapse.module.css";

interface CollapseProps extends ExtractProps<typeof Transition, "classes"> {
	readonly direction?: "horizontal" | "vertical";
	readonly origin?: "top" | "bottom" | "right" | "left";
}

export const Collapse: FC<CollapseProps> = ({
	className,
	direction = "vertical",
	origin = "top",
	...props
}) => {
	const classes = classNames(
		CollapseStyle.collapse,
		CollapseStyle[direction],
		CollapseStyle[origin],
		className
	);
	const transitionClasses = {
		entering: CollapseStyle.open,
		entered: CollapseStyle.opened,
		exiting: CollapseStyle.close,
		exited: CollapseStyle.closed,
	};
	return (
		<Transition className={classes} classes={transitionClasses} {...props} />
	);
};
