import classNames from "classnames";
import React, { FC } from "react";
import { SvgIcon } from "../SvgIcon";
import { ClassNameProps } from "@/interfaces/common";

import PlusIconStyle from "./PlusIcon.module.css";

export const PlusIcon: FC<ClassNameProps> = ({ className }) => {
	return (
		<SvgIcon
			className={classNames(PlusIconStyle.icon, className)}
			viewBox="0 0 6.35 6.35"
			title="plus"
		>
			<rect width=".794" height="6.35" x="2.778" ry=".52" />
			<rect
				width=".794"
				height="6.35"
				x="2.778"
				y="-6.35"
				ry=".52"
				transform="rotate(90)"
			/>
		</SvgIcon>
	);
};
