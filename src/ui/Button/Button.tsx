import classNames from "classnames";
import React, { FC, MouseEventHandler } from "react";
import { Link, Path } from "react-router-dom";
import { ClassNameComponent } from "../../interfaces/common";

import ButtonStyle from "./Button.module.css";

type ButtonType = "button" | "submit" | "reset";
type Color = "primary" | "secondary" | "monotype";
type Type = "common" | "text";

interface ButtonComponent extends ClassNameComponent {
	readonly buttonType?: ButtonType;
	readonly color?: Color;
	readonly type?: Type;
	readonly onClick?: MouseEventHandler<HTMLButtonElement>;
	readonly disabled?: boolean;
	readonly to?: string | Partial<Path>;
}

export const Button: FC<ButtonComponent> = ({
	className,
	children,
	disabled,
	to,
	onClick,
	buttonType = "button",
	color = "primary",
	type = "common",
}) => {
	const classes = classNames(
		ButtonStyle.button,
		ButtonStyle[`button--${type}`],
		ButtonStyle[`button--${color}`],
		className
	);

	if (to) {
		return (
			<Link className={classes} to={to} aria-disabled={disabled}>
				{children}
			</Link>
		);
	}

	return (
		<button
			className={classes}
			type={buttonType}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
