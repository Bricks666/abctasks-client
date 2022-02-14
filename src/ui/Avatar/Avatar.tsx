import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "../../interfaces/common";
import { Color, Size } from "../../interfaces/ui";
import { Picture } from "../Picture";

import AvatarStyle from "./Avatar.module.css";

interface AvatarProps extends ClassNameProps {
	readonly alt: string;
	readonly src?: string | null;
	readonly size?: Size;
	readonly color?: Color;
	readonly children?: string;
}

const createAlt = (alt: string) => alt[0]?.toUpperCase();

export const Avatar: FC<AvatarProps> = ({
	className,
	children,
	alt,
	src,
	size = "medium",
	color = "primary",
}) => {
	const classes = classNames(
		AvatarStyle.root,
		AvatarStyle[size],
		AvatarStyle[color],
		className
	);

	const fallback = alt ? alt : children || "A";

	const content = src ? (
		<Picture className={AvatarStyle.avatar} src={src} alt={fallback} />
	) : (
		createAlt(fallback)
	);

	return (
		<div className={classes} title={alt}>
			{content}
		</div>
	);
};
