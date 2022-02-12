import classNames from "classnames";
import React, { FC, MouseEventHandler } from "react";
import { Link, Path } from "react-router-dom";
import { ClassNameProps } from "../../interfaces/common";
import { Color, Size } from "../../interfaces/ui";

import ButtonStyle from "./Button.module.css";

type Type = "filed" | "text" | "outline";

interface ButtonComponent extends ClassNameProps {
	readonly color?: Color;
	readonly type?: Type;
	readonly onClick?: MouseEventHandler<HTMLButtonElement>;
	readonly disabled?: boolean;
	readonly to?: string | Partial<Path>;
	readonly size?: Size;
}

export const Button: FC<ButtonComponent> = ({
	className,
	children,
	disabled,
	to,
	onClick,
	color = "primary",
	type = "filed",
	size = "medium",
}) => {
	const classes = classNames(
		ButtonStyle.button,
		ButtonStyle[type],
		ButtonStyle[color],
		ButtonStyle[size],
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
		<button className={classes} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
};
