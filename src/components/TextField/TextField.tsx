import React, {
	forwardRef,
	HTMLInputTypeAttribute,
	PropsWithChildren,
	ReactNode,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { CommonProps } from '@/types/common';
import { Field } from '@/ui/Field';

export interface TextFieldProps extends CommonProps, UseFormRegisterReturn {
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
