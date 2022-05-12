import classNames from "classnames";
import React, { FC, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Text } from "../Text";

import CardHeaderStyle from "./CardHeader.module.css";

interface CardHeaderProps extends ClassNameProps {
	readonly secondaryAction?: JSX.Element;
}

export const CardHeader: FC<CardHeaderProps> = memo(function CardHeader({
	children,
	className,
	secondaryAction,
}) {
	return (
		<header className={classNames(CardHeaderStyle.header, className)}>
			<Text className={CardHeaderStyle.head} component="p" style="h3">
				{children}
			</Text>
			{secondaryAction && (
				<div className={CardHeaderStyle.secondaryAction}>{secondaryAction}</div>
			)}
		</header>
	);
});
