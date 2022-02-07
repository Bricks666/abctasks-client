import React, { FC, memo } from "react";
import classNames from "classnames";
import { ClassNameComponent } from "../../interfaces/common";

import SectionHeaderStyle from "./SectionHeader.module.css";

export const SectionHeader: FC<ClassNameComponent> = memo(
	({ children, className }) => {
		return (
			<h2 className={classNames(SectionHeaderStyle.sectionHeader, className)}>
				{children}
			</h2>
		);
	}
);
