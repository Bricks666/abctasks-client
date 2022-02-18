import classNames from "classnames";
import React, { FC, MouseEventHandler } from "react";
import { Link, To } from "react-router-dom";
import { ClassNameProps } from "@/interfaces/common";

import BaseButtonStyle from "./BaseButton.module.css";

/* Переработать ссылку */
export interface BaseButtonProps extends ClassNameProps {
	readonly onClick?: MouseEventHandler;
	readonly to?: To;
	readonly disabled?: boolean;
}

export const BaseButton: FC<BaseButtonProps> = ({
	children,
	className,
	disabled,
	to,
	onClick,
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
		<button className={classes} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};
