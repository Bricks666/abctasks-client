import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { SvgIcon } from "../SvgIcon";
import classNames from "classnames";

import EditIconStyle from "./EditIcon.module.css";

export const EditIcon: FC<ClassNameProps> = ({ className }) => {
	return (
		<SvgIcon
			className={classNames(EditIconStyle.icon, className)}
			viewBox="0 0 6.3499999 6.3500002"
		>
			<g transform="rotate(45 6.244 2.292) scale(1.47563 1.65069)">
				<rect width=".794" height="3.969" x="2.786" y="1.206" ry=".132" />
				<rect
					width=".794"
					height=".397"
					x="2.786"
					y=".644"
					ry=".132"
					rx=".132"
				/>
				<path
					d="M12.125 18.688c.15.276-1.325 2.695-1.64 2.687-.315-.007-1.672-2.495-1.508-2.764.164-.269 2.997-.2 3.148.077z"
					transform="matrix(.25206 -.00666 .00719 .27202 .389 .046)"
				/>
			</g>
		</SvgIcon>
	);
};
