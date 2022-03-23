import classNames from "classnames";
import React, {
	ChangeEventHandler,
	FC,
	FocusEventHandler,
	HTMLInputTypeAttribute,
	ReactNode,
	Ref,
} from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Input } from "../Input";
import { InputLabel } from "../InputLabel";
import { Textarea } from "../Textarea";
import { SubtextInput } from "../SubtextInput";
import { Select } from "../Select";

import FieldStyle from "./Field.module.css";

export interface FieldProps extends ClassNameProps {
	readonly name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly value?: any;
	readonly inputId?: string;
	readonly label?: ReactNode;
	readonly onChange: ChangeEventHandler;
	readonly onBlur?: FocusEventHandler;
	readonly onFocus?: FocusEventHandler;
	readonly type?: HTMLInputTypeAttribute;
	readonly inputRef?: Ref<
		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	>;
	readonly multiline?: boolean;
	readonly inputClassName?: string;
	readonly error?: string;
	readonly select?: boolean;
}

export const Field: FC<FieldProps> = ({
	className,
	label,
	inputId,
	inputRef,
	multiline,
	error,
	select,
	inputClassName,
	...input
}) => {
	const id = inputId || input.name;
	const rootClasses = classNames(
		FieldStyle.field,
		{
			[FieldStyle.error]: !!error,
		},
		className
	);
	const fieldLabel = label ? (
		<InputLabel HTMLFor={id}>{label}</InputLabel>
	) : null;

	const control = select ? (
		<Select
			className={inputClassName}
			{...input}
			id={id}
			ref={inputRef as Ref<HTMLSelectElement>}
		/>
	) : multiline ? (
		<Textarea
			className={inputClassName}
			{...input}
			id={id}
			ref={inputRef as Ref<HTMLTextAreaElement>}
		/>
	) : (
		<Input
			className={inputClassName}
			{...input}
			id={id}
			ref={inputRef as Ref<HTMLInputElement>}
		/>
	);

	const helpText = error ? <SubtextInput>{error}</SubtextInput> : null;
	return (
		<div className={rootClasses}>
			{fieldLabel}
			{control}
			{helpText}
		</div>
	);
};
