import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Size } from "@/interfaces/ui";
import { BaseButton, BaseButtonProps } from "../BaseButton";

import IconButtonStyle from "./IconButton.module.css";

interface IconButtonProps extends ClassNameProps, BaseButtonProps {
	readonly size?: Size;
}

export const IconButton: FC<IconButtonProps> = ({
	className,
	children,
	size = "medium",
	...button
}) => {
	const classes = classNames(
		IconButtonStyle.button,
		IconButtonStyle[size],
		className
	);
	return (
		<BaseButton className={classes} {...button}>
			{children}
		</BaseButton>
	);
};
