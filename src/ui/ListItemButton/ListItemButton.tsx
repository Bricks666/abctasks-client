import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "../../interfaces/common";
import { BaseButton, BaseButtonProps } from "../BaseButton";

import ListItemButtonStyle from "./ListItemButton.module.css";

interface ListItemButtonProps extends ClassNameProps, BaseButtonProps {}

export const ListItemButton: FC<ListItemButtonProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<BaseButton
			className={classNames(ListItemButtonStyle.button, className)}
			{...props}
		>
			{children}
		</BaseButton>
	);
};
