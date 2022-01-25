import React, { FC, memo, ReactText } from "react";
import classNames from "classnames";
import { ClassNameComponent } from "../../interfaces/common";

import SectionHeaderStyle from "./SectionHeader.module.css";

interface SectionHeaderComponent extends ClassNameComponent {
	children: ReactText | ReactText[];
}

export const SectionHeader: FC<SectionHeaderComponent> = memo(
	({ children, className }) => {
		return (
			<h2 className={classNames(SectionHeaderStyle.sectionHeader, className)}>
				{children}
			</h2>
		);
	}
);
