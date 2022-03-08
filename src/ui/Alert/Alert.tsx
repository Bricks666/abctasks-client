import React, { FC, MouseEventHandler, ReactElement } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { Color } from "@/interfaces/ui";
import { Block } from "../Block";
import { IconButton } from "../IconButton";
import { CrossIcon } from "../CrossIcon";
import { ExclamationIcon } from "../ExclamationIcon";
import { SuccessIcon } from "../SuccessIcon";
import { InfoIcon } from "../InfoIcon";

import AlertStyle from "./Alert.module.css";

type AllowedColor = Exclude<Color, "dark" | "secondary">;

interface AlertProps extends ClassNameProps {
	readonly color?: AllowedColor;
	readonly type?: "filed" | "outline" | "standard";
	readonly onClose?: MouseEventHandler;
	readonly action?: JSX.Element;
}

const iconMap: Record<AllowedColor, ReactElement> = {
	error: <ExclamationIcon />,
	success: <SuccessIcon />,
	warning: <ExclamationIcon />,
	primary: <InfoIcon />,
};

export const Alert: FC<AlertProps> = ({
	className,
	children,
	onClose,
	action,
	color = "primary",
	type = "standard",
}) => {
	const rootClasses = classNames(
		AlertStyle.root,
		AlertStyle[color],
		AlertStyle[type],
		className
	);
	const actionPart = action ? (
		action
	) : onClose ? (
		<IconButton onClick={onClose} size="small">
			<CrossIcon />
		</IconButton>
	) : null;
	return (
		<Block className={rootClasses} role="alert">
			<div className={AlertStyle.icon}>{iconMap[color]}</div>
			<div className={AlertStyle.content}>{children}</div>
			{actionPart && <div className={AlertStyle.action}>{actionPart}</div>}
		</Block>
	);
};
