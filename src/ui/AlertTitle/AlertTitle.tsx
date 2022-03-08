import { ClassNameProps } from "@/interfaces/common";
import classNames from "classnames";
import React, { FC } from "react";
import { Text } from "../Text";

import AlertTitleStyle from "./AlertTitle.module.css";

export const AlertTitle: FC<ClassNameProps> = ({ className, children }) => {
	return (
		<Text
			className={classNames(AlertTitleStyle.title, className)}
			component="p"
			style="h6"
		>
			{children}
		</Text>
	);
};
