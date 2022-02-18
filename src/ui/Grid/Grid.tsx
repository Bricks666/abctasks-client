import classNames from "classnames";
import React, { FC, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";

import GridStyle from "./Grid.module.css";

export const Grid: FC<ClassNameProps> = memo(({ children, className }) => {
	return (
		<div className={classNames(GridStyle.grid, className)}>{children}</div>
	);
});
