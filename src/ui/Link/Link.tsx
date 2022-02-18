import classNames from "classnames";
import React, { FC } from "react";
import { LinkProps, Link as ReactLink } from "react-router-dom";
import { ClassNameProps } from "@/interfaces/common";

import LinkStyle from "./Link.module.css";

type LinkType = "common" | "react";

interface LinkComponent extends ClassNameProps, Readonly<LinkProps> {
	readonly type: LinkType;
	readonly to: string;
}

export const Link: FC<LinkComponent> = ({
	className,
	type,
	to,
	state,
	replace,
	reloadDocument,
	children,
	...link
}) => {
	const classes = classNames(LinkStyle.link, className);
	if (type === "common") {
		return (
			<a className={classes} href={to} {...link}>
				{children}
			</a>
		);
	}

	return (
		<ReactLink
			className={classes}
			state={state}
			to={to}
			replace={replace}
			reloadDocument={reloadDocument}
			{...link}
		>
			{children}
		</ReactLink>
	);
};
