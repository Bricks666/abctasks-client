import React, { FC, MouseEventHandler } from "react";
import { OnlyClassName } from "../../interfaces/common";

type ButtonType = "button" | "submit" | "reset";

interface ButtonComponent extends OnlyClassName {
	type?: ButtonType;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}

export const Button: FC<ButtonComponent> = ({
	className,
	children,
	...button
}) => {
	return (
		<button className={className} {...button}>
			{children}
		</button>
	);
};
