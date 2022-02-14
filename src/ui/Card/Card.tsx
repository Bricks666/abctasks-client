import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "../../interfaces/common";

import CardStyle from "./Card.module.css";

interface CardProps extends ClassNameProps {
	readonly shadowOn?: "always" | "hover" | "never";
}

export const Card: FC<CardProps> = ({
	className,
	children,
	shadowOn = "hover",
}) => {
	const classes = classNames(
		CardStyle.card,
		{
			[CardStyle.shadowAlways]: shadowOn === "always",
			[CardStyle.shadowHover]: shadowOn === "hover",
		},
		className
	);
	return <div className={classes}>{children}</div>;
};
