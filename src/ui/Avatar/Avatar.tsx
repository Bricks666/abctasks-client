import classNames from "classnames";
import React, { forwardRef, HTMLAttributes, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Color, Size } from "@/interfaces/ui";
import { Picture } from "../Picture";
import { useLoadImage } from "./useLoadImage";

import AvatarStyle from "./Avatar.module.css";

interface AvatarProps
	extends ClassNameProps,
		Omit<HTMLAttributes<HTMLDivElement>, "className"> {
	readonly alt: string;
	readonly src?: string | null;
	readonly size?: Size;
	readonly color?: Color;
	readonly tabIndex?: number;
}

export const Avatar = memo(
	forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
		{
			className,
			children,
			alt,
			src,
			size = "medium",
			color = "primary",
			...props
		},
		ref
	) {
		const classes = classNames(
			AvatarStyle.root,
			AvatarStyle[size],
			AvatarStyle[color],
			className
		);
		const status = useLoadImage(src);
		const imageLoadedNotFalling = src && status === "loaded";

		const content = imageLoadedNotFalling ? (
			<Picture className={AvatarStyle.avatar} src={src} alt={alt} />
		) : (
			children
		);

		return (
			<div className={classes} title={alt} ref={ref} {...props}>
				{content}
			</div>
		);
	})
);
