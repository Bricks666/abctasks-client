import classNames from "classnames";
import React, { FC, ImgHTMLAttributes, memo } from "react";
import { ClassNameComponent } from "../../interfaces/common";

import PictureStyle from "./Picture.module.css";

interface PictureComponent
	extends ClassNameComponent,
		Readonly<ImgHTMLAttributes<HTMLImageElement>> {
	readonly alt: string;
	readonly src: string;
}

export const Picture: FC<PictureComponent> = memo(
	({ className, alt, src, ...props }) => {
		return (
			<img
				className={classNames(PictureStyle.picture, className)}
				src={src}
				alt={alt}
				{...props}
			/>
		);
	}
);
