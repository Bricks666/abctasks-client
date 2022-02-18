import classNames from "classnames";
import React, { FC, MouseEventHandler, ReactNode } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { CrossIcon } from "../CrossIcon/CrossIcon";
import { IconButton } from "../IconButton";
import { Text } from "../Text";

import PopupHeaderStyle from "./PopupHeader.module.css";

interface PopupHeaderProps extends ClassNameProps {
	readonly onClose?: MouseEventHandler;
	readonly closeIcon?: ReactNode;
}

export const PopupHeader: FC<PopupHeaderProps> = ({
	className,
	children,
	onClose,
	closeIcon,
}) => {
	return (
		<header className={classNames(PopupHeaderStyle.header, className)}>
			{children && (
				<Text className={PopupHeaderStyle.text} component="h2">
					{children}
				</Text>
			)}
			{onClose && (
				<IconButton className={PopupHeaderStyle.button} onClick={onClose}>
					{closeIcon ?? <CrossIcon />}
				</IconButton>
			)}
		</header>
	);
};
