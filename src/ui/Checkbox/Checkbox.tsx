import classNames from "classnames";
import React, {
	ChangeEventHandler,
	FocusEventHandler,
	memo,
	PropsWithChildren,
	Ref,
} from "react";
import { ClassNameProps } from "../../interfaces/common";
import { Color, Size } from "../../interfaces/ui";
import { InputLabel } from "../InputLabel";

import CheckboxStyle from "./Checkbox.module.css";

export interface CheckboxProps extends ClassNameProps {
	readonly name: string;
	readonly checked: boolean;
	readonly onChange: ChangeEventHandler;
	readonly onFocus?: FocusEventHandler;
	readonly onBlur?: FocusEventHandler;
	readonly require?: boolean;
	readonly readOnly?: boolean;
	readonly inputId?: string;
	readonly size?: Size;
	readonly color?: Color;
	readonly inputRef?: Ref<HTMLInputElement>;
}

export const Checkbox = memo<PropsWithChildren<CheckboxProps>>(
	({
		className,
		children,
		inputId,
		color = "primary",
		size = "medium",
		...checkbox
	}) => {
		const classes = classNames(
			CheckboxStyle.label,
			CheckboxStyle[color],
			CheckboxStyle[size]
		);

		const id = inputId || checkbox.name;

		return (
			<div className={className}>
				<input
					className={classNames(CheckboxStyle.input, "visibility-hidden")}
					{...checkbox}
					type="checkbox"
					id={id}
				/>
				<InputLabel className={classes} HTMLFor={id}>
					{children}
				</InputLabel>
			</div>
		);
	}
);
