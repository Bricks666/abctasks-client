import classNames from "classnames";
import React, { FC, ReactText } from "react";
import { ClassNameComponent } from "../../interfaces/common";

import SubsectionHeaderStyle from "./SubsectionHeader.module.css";

interface SubsectionHeaderComponent extends ClassNameComponent {
	children: ReactText | ReactText[];
}

export const SubsectionHeader: FC<SubsectionHeaderComponent> = ({
	className,
	children,
}) => {
	return (
		<h3
			className={classNames(SubsectionHeaderStyle.subsectionHeader, className)}
		>
			{children}
		</h3>
	);
};
