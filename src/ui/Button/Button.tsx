import classNames from "classnames";
import React, { FC, ReactElement } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Color, Size } from "@/interfaces/ui";
import { BaseButton, BaseButtonProps } from "../BaseButton";
import { Text } from "../Text";

import ButtonStyle from "./Button.module.css";

type Type = "filed" | "text" | "outline";

interface ButtonProps extends ClassNameProps, BaseButtonProps {
	readonly color?: Color;
	readonly type?: Type;
	readonly size?: Size;
	readonly icon?: ReactElement;
	readonly iconPosition?: "start" | "end";
}

export const Button: FC<ButtonProps> = ({
	className,
	color = "primary",
	type = "filed",
	size = "medium",
	iconPosition = "start",
	icon = null,
	children,
	...props
}) => {
	const classes = classNames(
		ButtonStyle.button,
		ButtonStyle[type],
		ButtonStyle[color],
		ButtonStyle[size],
		className
	);

	const buttonIcon = icon ? (
		<Text
			className={ButtonStyle[`icon--${iconPosition}`]}
			component="span"
			style="p"
		>
			{icon}
		</Text>
	) : null;

	return (
		<BaseButton className={classes} {...props}>
			{[buttonIcon, children]}
		</BaseButton>
	);
};
