import classNames from "classnames";
import React, { FC, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Block } from "../Block";

import CardStyle from "./Card.module.css";

interface CardProps extends ClassNameProps {
	readonly shadowOn?: "always" | "hover" | "never";
}

export const Card: FC<CardProps> = memo(function Card({
	className,
	children,
	shadowOn = "hover",
}) {
	const classes = classNames(
		CardStyle.card,
		{
			[CardStyle.shadowAlways]: shadowOn === "always",
			[CardStyle.shadowHover]: shadowOn === "hover",
		},
		className
	);
	return <Block className={classes}>{children}</Block>;
});
