import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
} from "react";
import { ClassNameProps } from "@/interfaces/common";

import SelectStyle from "./Select.module.css";
import classNames from "classnames";

interface SelectProps extends ClassNameProps {
	readonly value: number | string;
	readonly onChange?: ChangeEventHandler;
	readonly onFocus?: FocusEventHandler;
	readonly onBlur?: FocusEventHandler;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	function Select({ className, children, ...select }, ref) {
		return (
			<select
				className={classNames(SelectStyle.select, className)}
				{...select}
				ref={ref}
			>
				{children}
			</select>
		);
	}
);
