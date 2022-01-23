import classNames from "classnames";
import React, { FC, ImgHTMLAttributes } from "react";
import { ClassNameComponent } from "../../interfaces/common";

import PictureStyle from "./Picture.module.css";

interface PictureComponent
	extends ClassNameComponent,
		ImgHTMLAttributes<HTMLImageElement> {
	alt: string;
	src: string;
}

export const Picture: FC<PictureComponent> = ({
	className,
	alt,
	src,
	...props
}) => {
	return (
		<img
			className={classNames(PictureStyle.picture, className)}
			src={src}
			alt={alt}
			{...props}
		/>
	);
};
