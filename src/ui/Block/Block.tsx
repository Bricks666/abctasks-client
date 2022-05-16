import React, { FC, HTMLAttributes, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";
import classNames from "classnames";

import BlockStyle from "./Block.module.css";

type Type = "rounded" | "square";

export interface BlockProps
	extends ClassNameProps,
		Omit<HTMLAttributes<HTMLDivElement>, "className"> {
	readonly type?: Type;
	readonly shadowOn?: "always" | "hover" | "never";
}

export const Block: FC<BlockProps> = memo(function Block({
	children,
	className,
	type = "rounded",
	shadowOn = "hover",
	...props
}) {
	const classes = classNames(
		BlockStyle.block,
		BlockStyle[type],
		{
			[BlockStyle.shadowAlways]: shadowOn === "always",
			[BlockStyle.shadowHover]: shadowOn === "hover",
		},
		className
	);
	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
});
