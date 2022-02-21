import React, { FC, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";
import classNames from "classnames";

import BlockStyle from "./Block.module.css";

type Type = "rounded" | "square";

export interface BlockProps extends ClassNameProps {
	readonly type?: Type;
}

export const Block: FC<BlockProps> = memo(function Block({
	children,
	className,
	type = "rounded",
}) {
	const classes = classNames(BlockStyle.block, BlockStyle[type], className);
	return <div className={classes}>{children}</div>;
});
