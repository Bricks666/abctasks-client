import classNames from "classnames";
import React, { forwardRef, memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ClassNameComponent } from "../../interfaces/common";

import CheckboxStyle from "./Checkbox.module.css";

interface CheckboxComponent extends ClassNameComponent, UseFormRegisterReturn {}

export const Checkbox = memo(
	forwardRef<HTMLInputElement, CheckboxComponent>(
		({ className, children, ...checkbox }, ref) => {
			return (
				<div className={className}>
					<input
						id={checkbox.name}
						className={classNames(CheckboxStyle.input, "visibility-hidden")}
						{...checkbox}
						type="checkbox"
						ref={ref}
					/>
					<label className={CheckboxStyle.label} htmlFor={checkbox.name}>
						{children}
					</label>
				</div>
			);
		}
	)
);
