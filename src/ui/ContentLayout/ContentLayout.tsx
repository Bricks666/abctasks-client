import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "../../interfaces/common";

import ContentLayoutStyle from "./ContentLayout.module.css";

export const ContentLayout: FC<ClassNameProps> = ({ children, className }) => {
	return (
		<div className={classNames(ContentLayoutStyle.contentLayout, className)}>
			{children}
		</div>
	);
};
