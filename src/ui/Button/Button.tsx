import classNames from "classnames";
import React, { FC, MouseEventHandler } from "react";
import { ClassNameComponent } from "../../interfaces/common";

import ButtonStyle from "./Button.module.css";

type ButtonType = "button" | "submit" | "reset";

interface ButtonComponent extends ClassNameComponent {
	readonly type?: ButtonType;
	readonly onClick?: MouseEventHandler<HTMLButtonElement>;
	readonly disabled?: boolean;
}

export const Button: FC<ButtonComponent> = ({
	className,
	children,
	...button
}) => {
	return (
		<button className={classNames(ButtonStyle.button, className)} {...button}>
			{children}
		</button>
	);
};
