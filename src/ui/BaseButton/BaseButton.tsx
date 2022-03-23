import classNames from "classnames";
import React, { FC, DOMAttributes, HTMLAttributes } from "react";
import { Link, To } from "react-router-dom";
import { ClassNameProps } from "@/interfaces/common";

import BaseButtonStyle from "./BaseButton.module.css";

/* Переработать ссылку */
export interface BaseButtonProps
	extends ClassNameProps,
		DOMAttributes<HTMLButtonElement>,
		Omit<HTMLAttributes<HTMLButtonElement>, "className"> {
	readonly to?: To;
	readonly disabled?: boolean;
	readonly buttonType?: "button" | "submit" | "reset";
}

export const BaseButton: FC<BaseButtonProps> = ({
	children,
	className,
	disabled,
	to,
	buttonType,
	...props
}) => {
	const classes = classNames(BaseButtonStyle.button, className);
	if (to) {
		return (
			<Link className={classes} to={to}>
				{children}
			</Link>
		);
	}
	return (
		<button
			className={classes}
			disabled={disabled}
			{...props}
			type={buttonType}
		>
			{children}
		</button>
	);
};
