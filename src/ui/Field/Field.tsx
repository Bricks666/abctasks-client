import classNames from "classnames";
import React, {
	ChangeEventHandler,
	FC,
	FocusEventHandler,
	HTMLInputTypeAttribute,
	Ref,
} from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Input } from "../Input";
import { InputLabel } from "../InputLabel";
import { Textarea } from "../Textarea";
import { SubtextInput } from "../SubtextInput";

import FieldStyle from "./Field.module.css";
import { Select } from "../Select";

export interface FieldProps extends ClassNameProps {
	readonly value: string | number;
	readonly name: string;
	readonly inputId?: string;
	readonly label?: string;
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
	name,
	inputRef,
	multiline,
	inputClassName,
	error,
	select,
	...input
}) => {
	const id = inputId || name;
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
		<Select className={inputClassName} {...input} />
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
