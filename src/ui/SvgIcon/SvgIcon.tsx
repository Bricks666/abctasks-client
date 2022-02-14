import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "../../interfaces/common";

import SvgIconStyle from "./SvgIcon.module.css";

export const SvgIcon: FC<ClassNameProps> = ({ children, className }) => {
	return (
		<svg
			className={classNames(SvgIconStyle.icon, className)}
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			{children}
		</svg>
	);
};
