import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { SvgIcon } from "../SvgIcon";

import UploadIconStyle from "./UploadIcon.module.css";

export const UploadIcon: FC<ClassNameProps> = ({ className }) => {
	return (
		<SvgIcon className={className} viewBox="0 0 6.35 6.35">
			<rect
				className={UploadIconStyle.rect}
				width="5.292"
				height=".661"
				x=".529"
				y="5.689"
				ry=".265"
				rx=".265"
			/>
			<rect
				className={UploadIconStyle.rect}
				width="4.762"
				height=".661"
				x=".654"
				y="-3.506"
				ry=".265"
				rx=".238"
				transform="rotate(90)"
			/>
			<g transform="translate(.05)">
				<rect
					className={UploadIconStyle.rect}
					width="2.646"
					height=".661"
					x="2.292"
					y="-2.126"
					ry=".265"
					rx=".132"
					transform="rotate(45)"
				/>
				<rect
					className={UploadIconStyle.rect}
					width="2.646"
					height=".661"
					x="-2.126"
					y="-2.954"
					ry=".265"
					rx=".132"
					transform="rotate(135)"
				/>
			</g>
			<rect
				className={UploadIconStyle.rect}
				width=".087"
				height=".019"
				x="2.217"
				y="1.573"
				rx=".132"
				ry=".019"
			/>
		</SvgIcon>
	);
};
