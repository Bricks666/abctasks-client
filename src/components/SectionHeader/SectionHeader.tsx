import React, { FC, ReactText } from "react";
import classNames from "classnames";
import { OnlyClassName } from "../../interfaces/common";

import SectionHeaderStyle from "./SectionHeader.module.css";

interface SectionHeaderComponent extends OnlyClassName {
	children: ReactText | ReactText[];
}

export const SectionHeader: FC<SectionHeaderComponent> = ({
	children,
	className,
}) => {
	return (
		<h2 className={classNames(SectionHeaderStyle.sectionHeader, className)}>
			{children}
		</h2>
	);
};
