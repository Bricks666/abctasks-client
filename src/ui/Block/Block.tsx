import React, { FC, HTMLAttributes, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";
import classNames from "classnames";

import BlockStyle from "./Block.module.css";

type Type = "rounded" | "square";

export interface BlockProps
	extends ClassNameProps,
		Omit<HTMLAttributes<HTMLDivElement>, "className"> {
	readonly type?: Type;
}

export const Block: FC<BlockProps> = memo(function Block({
	children,
	className,
	type = "rounded",
	...props
}) {
	const classes = classNames(BlockStyle.block, BlockStyle[type], className);
	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
});
