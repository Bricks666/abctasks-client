import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";

import InputLabelStyle from "./InputLabel.module.css";

interface InputLabelProps extends ClassNameProps {
	readonly HTMLFor: string;
}

export const InputLabel: FC<InputLabelProps> = ({
	HTMLFor,
	children,
	className,
}) => {
	const classes = classNames(InputLabelStyle.label, className);
	return (
		<label className={classes} htmlFor={HTMLFor}>
			{children}
		</label>
	);
};
