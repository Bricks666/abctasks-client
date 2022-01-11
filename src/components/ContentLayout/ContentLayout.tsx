import React, { FC } from "react";
import classNames from "classnames";
import { OnlyClassName } from "../../interfaces/common";

import ContentLayoutStyle from "./ContentLayout.module.css";

export const ContentLayout: FC<OnlyClassName> = ({ children, className }) => {
	return (
		<div className={classNames(ContentLayoutStyle.contentLayout, className)}>
			{children}
		</div>
	);
};
