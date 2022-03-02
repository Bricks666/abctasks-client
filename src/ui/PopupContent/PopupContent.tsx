import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";

import PopupContentStyle from "./PopupContent.module.css";

export const PopupContent: FC<ClassNameProps> = ({ className, children }) => {
	return (
		<div className={classNames(PopupContentStyle.content, className)}>
			{children}
		</div>
	);
};
