import { ClassNameProps } from "@/interfaces/common";
import classNames from "classnames";
import React, { FC } from "react";
import { SvgIcon } from "../SvgIcon";

import DeleteIconStyle from "./DeleteIcon.module.css";

export const DeleteIcon: FC<ClassNameProps> = ({ className }) => {
	return (
		<SvgIcon
			className={classNames(DeleteIconStyle.icon, className)}
			viewBox="0 0 6.35 6.35"
			title="trash basket"
		>
			<g transform="matrix(.95694 0 0 .95694 .127 -.256)">
				<path
					transform="translate(-.25)"
					strokeWidth=".906036"
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M1.847 1.587h3.175c.146 0 .264.119.264.265v4.233a.264.264 0 0 1-.264.265H1.847a.264.264 0 0 1-.265-.265V1.852c0-.146.118-.265.265-.265Z"
				/>
				<rect
					strokeWidth=".79375"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="4.7624998"
					height="0.59687499"
					x=".804"
					y=".758"
					rx=".265"
					ry=".265"
				/>
				<rect
					strokeWidth=".582473"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="1.3229166"
					height="0.26458335"
					x="2.524"
					y=".52"
					ry=".106"
					rx=".079"
				/>
			</g>
		</SvgIcon>
	);
};
