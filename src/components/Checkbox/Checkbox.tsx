import React, { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ClassNameProps } from "@/interfaces/common";
import { Checkbox as CheckboxUI } from "@/ui/Checkbox";

interface CheckboxProps extends ClassNameProps, UseFormRegisterReturn {
	readonly disabled?: boolean;
	readonly required?: boolean;
	readonly readOnly?: boolean;
	readonly label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, ...props }, ref) => {
		return (
			<CheckboxUI inputRef={ref} {...props}>
				{label}
			</CheckboxUI>
		);
	}
);
