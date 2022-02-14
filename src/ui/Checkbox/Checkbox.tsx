import classNames from "classnames";
import React, { forwardRef, memo, PropsWithChildren } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ClassNameProps } from "../../interfaces/common";
import { Color, Size } from "../../interfaces/ui";

import CheckboxStyle from "./Checkbox.module.css";

interface CheckboxComponent extends ClassNameProps, UseFormRegisterReturn {
	readonly size?: Size;
	readonly color?: Color;
}

export const Checkbox = memo(
	forwardRef<HTMLInputElement, PropsWithChildren<CheckboxComponent>>(
		(
			{ className, children, color = "primary", size = "medium", ...checkbox },
			ref
		) => {
			const classes = classNames(
				CheckboxStyle.label,
				CheckboxStyle[color],
				CheckboxStyle[size]
			);
			return (
				<div className={className}>
					<input
						id={checkbox.name}
						className={classNames(CheckboxStyle.input, "visibility-hidden")}
						{...checkbox}
						type="checkbox"
						ref={ref}
					/>
					<label className={classes} htmlFor={checkbox.name}>
						{children}
					</label>
				</div>
			);
		}
	)
);
