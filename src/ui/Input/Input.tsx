import React, { forwardRef, HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { OnlyClassName } from "../../interfaces/common";

interface InputComponent extends OnlyClassName, UseFormRegisterReturn {
	type?: HTMLInputTypeAttribute;
}

export const Input = forwardRef<HTMLInputElement, InputComponent>(
	({ children, className, ...input }, ref) => {
		return (
			<label className={className}>
				{children}
				<input {...input} ref={ref} />
			</label>
		);
	}
);
