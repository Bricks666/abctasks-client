import classNames from "classnames";
import React, {
	forwardRef,
	HTMLInputTypeAttribute,
	memo,
	ReactText,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ClassNameProps } from "../../interfaces/common";

import InputStyle from "./Input.module.css";

/* Возмодно стоит абстрагировать интерфейс от формы */
interface InputComponent extends ClassNameProps, UseFormRegisterReturn {
	readonly type?: HTMLInputTypeAttribute;
	readonly children?: ReactText;
}

/* Возможно стоит разделить лабел и поле ввода */

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
