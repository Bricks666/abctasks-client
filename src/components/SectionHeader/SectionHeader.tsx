import React, { FC, ReactText } from "react";
import { OnlyClassName } from "interfaces/common";
import classNames from "classnames";

interface SectionHeaderComponent extends OnlyClassName {
	children: ReactText | ReactText[];
}

export const SectionHeader: FC<SectionHeaderComponent> = ({
	children,
	className,
}) => {
	return <h2 className={classNames(className)}>{children}</h2>;
};
