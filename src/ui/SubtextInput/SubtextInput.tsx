import { ClassNameProps } from "@/interfaces/common";
import classNames from "classnames";
import React, { FC } from "react";
import { Text } from "../Text";

import SubtextInputStyle from "./SubtextInput.module.css";

export const SubtextInput: FC<ClassNameProps> = ({ className, children }) => {
	return (
		<Text
			className={classNames(SubtextInputStyle.text, className)}
			component="span"
		>
			{children}
		</Text>
	);
};
