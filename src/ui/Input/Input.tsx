import classNames from "classnames";
import React, {
	forwardRef,
	HTMLInputTypeAttribute,
	memo,
	ReactText,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ClassNameComponent } from "../../interfaces/common";

import InputStyle from "./Input.module.css";

interface InputComponent extends ClassNameComponent, UseFormRegisterReturn {
	readonly type?: HTMLInputTypeAttribute;
	readonly children?: ReactText;
}

export const Input = memo(
	forwardRef<HTMLInputElement, InputComponent>(
		({ children, className, ...input }, ref) => {
			return (
				<label className={classNames(InputStyle.label, className)}>
					{children}
					<input className={InputStyle.input} {...input} ref={ref} />
				</label>
			);
		}
	)
);
