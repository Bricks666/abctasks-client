import classNames from "classnames";
import React, { FC, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";

import SvgIconStyle from "./SvgIcon.module.css";

interface SvgIconProps extends ClassNameProps {
	readonly viewBox: string;
	readonly title?: string;
}

export const SvgIcon: FC<SvgIconProps> = memo(function SvgIcon({
	children,
	className,
	viewBox,
	title,
}) {
	return (
		<svg
			className={classNames(SvgIconStyle.icon, className)}
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox={viewBox}
			aria-label={title}
		>
			{children}
		</svg>
	);
});
