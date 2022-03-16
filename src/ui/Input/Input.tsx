/* eslint-disable prefer-rest-params */
import classNames from "classnames";
import React, {
	ChangeEventHandler,
	HTMLInputTypeAttribute,
	memo,
	FocusEventHandler,
	forwardRef,
} from "react";
import { ClassNameProps } from "@/interfaces/common";

import InputStyle from "./Input.module.css";

interface InputProps extends ClassNameProps {
	readonly value?: string | number;
	readonly onChange?: ChangeEventHandler;
	readonly onFocus?: FocusEventHandler;
	readonly type?: HTMLInputTypeAttribute;
	readonly name?: string;
	readonly disabled?: boolean;
	readonly readOnly?: boolean;
	readonly id?: string;
}

export const Input = memo(
	forwardRef<HTMLInputElement, InputProps>(function Input(
		{ className, type = "text", ...input },
		ref
	) {
		const classes = classNames(
			InputStyle.input,
			{ [InputStyle.color]: type === "color" },
			className
		);
		return <input className={classes} type={type} {...input} ref={ref} />;
	})
);
