import React, {
	forwardRef,
	HTMLInputTypeAttribute,
	PropsWithChildren,
	ReactNode,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ClassNameProps } from "@/interfaces/common";
import { Field } from "@/ui/Field";

interface TextFieldProps extends ClassNameProps, UseFormRegisterReturn {
	readonly error?: string;
	readonly multiline?: boolean;
	readonly select?: boolean;
	readonly type?: HTMLInputTypeAttribute;
	readonly inputClassName?: string;
	readonly label?: ReactNode;
	readonly accept?: string;
}

export const TextField = forwardRef<
	HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
	PropsWithChildren<TextFieldProps>
>((props, ref) => {
	return <Field {...props} inputRef={ref} />;
});
