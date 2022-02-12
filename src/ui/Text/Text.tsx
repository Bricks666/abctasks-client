import classNames from "classnames";
import React, { createElement, FC } from "react";
import { ClassNameProps } from "../../interfaces/common";

import TextStyle from "./Text.module.css";

type Components = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TextProps extends ClassNameProps {
	readonly component?: Components;
	readonly style?: Components;
	readonly paddings?: boolean;
	readonly margins?: boolean;
}

export const Text: FC<TextProps> = ({
	children,
	className,
	component = "p",
	style = component,
	paddings = false,
	margins = false,
}) => {
	const element = createElement(component, {}, {});
	const classes = classNames(
		TextStyle.text,
		TextStyle[style],
		{
			[TextStyle.withoutPadding]: !paddings,
			[TextStyle.withoutMargins]: !margins,
		},
		className
	);
	return (
		<element.type className={classes} {...element.props}>
			{children}
		</element.type>
	);
};
