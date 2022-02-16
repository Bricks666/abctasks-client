import classNames from "classnames";
import React, { createElement, CSSProperties, FC, memo } from "react";
import { ClassNameProps } from "../../interfaces/common";

import TextStyle from "./Text.module.css";

type Components = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TextProps extends ClassNameProps {
	readonly component?: Components;
	readonly style?: Components;
	readonly paddings?: boolean;
	readonly margins?: boolean;
	readonly cssStyles?: CSSProperties;
}

export const Text: FC<TextProps> = memo(
	({
		children,
		className,
		cssStyles,
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
			<element.type className={classes} {...element.props} style={cssStyles}>
				{children}
			</element.type>
		);
	}
);
