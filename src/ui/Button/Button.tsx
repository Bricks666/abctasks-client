import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Color, Size } from "@/interfaces/ui";
import { BaseButton, BaseButtonProps } from "../BaseButton";

import ButtonStyle from "./Button.module.css";

type Type = "filed" | "text" | "outline";

interface ButtonProps extends ClassNameProps, BaseButtonProps {
	readonly color?: Color;
	readonly type?: Type;
	readonly size?: Size;
}

export const Button: FC<ButtonProps> = ({
	className,
	color = "primary",
	type = "filed",
	size = "medium",
	...props
}) => {
	const classes = classNames(
		ButtonStyle.button,
		ButtonStyle[type],
		ButtonStyle[color],
		ButtonStyle[size],
		className
	);

	return <BaseButton className={classes} {...props} />;
};
