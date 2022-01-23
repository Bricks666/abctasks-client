import React, { FC, MouseEventHandler } from "react";
import { ClassNameComponent } from "../../interfaces/common";

type ButtonType = "button" | "submit" | "reset";

interface ButtonComponent extends ClassNameComponent {
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
