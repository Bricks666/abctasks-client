import { ClassNameProps } from "@/interfaces/common";
import React, { FC } from "react";
import { SvgIcon } from "../SvgIcon";

import ExclamationIconStyle from "./ExclamationIcon.module.css";

export const ExclamationIcon: FC<ClassNameProps> = ({ className }) => {
	return (
		<SvgIcon className={className} viewBox="0 0 6.35 6.35" title="exclamation">
			<g transform="translate(-.913 -.136)">
				<circle
					className={ExclamationIconStyle.icon}
					cx="4.088"
					cy="5.957"
					r=".529"
				/>
				<rect
					className={ExclamationIconStyle.icon}
					width="1.058"
					height="4.762"
					x="3.559"
					y=".136"
					ry=".745"
				/>
			</g>
		</SvgIcon>
	);
};
