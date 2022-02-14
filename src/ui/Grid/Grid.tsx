import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "../../interfaces/common";

import GridStyle from "./Grid.module.css";

export const Grid: FC<ClassNameProps> = ({ children, className }) => {
	return (
		<div className={classNames(GridStyle.grid, className)}>{children}</div>
	);
};
