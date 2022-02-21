import classNames from "classnames";
import React, { FC, ImgHTMLAttributes, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";

import PictureStyle from "./Picture.module.css";

interface PictureProps
	extends ClassNameProps,
		Readonly<ImgHTMLAttributes<HTMLImageElement>> {
	readonly alt: string;
	readonly src: string;
}

export const Picture: FC<PictureProps> = memo(function Picture({
	className,
	alt,
	src,
	...props
}) {
	return (
		<img
			className={classNames(PictureStyle.picture, className)}
			src={src}
			alt={alt}
			{...props}
		/>
	);
});
