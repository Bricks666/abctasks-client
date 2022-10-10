/* eslint-disable no-nested-ternary */
import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Input } from '../Input';
import { InputLabel } from '../InputLabel';
import { Textarea } from '../Textarea';
import { SubtextInput } from '../SubtextInput';
import { Select } from '../Select';

import FieldStyle from './Field.module.css';

export interface FieldProps extends CommonProps {
	readonly name: string;
	readonly value?: any;
	readonly inputId?: string;
	readonly label?: React.ReactNode;
	readonly onChange: React.ChangeEventHandler;
	readonly onBlur?: React.FocusEventHandler;
	readonly onFocus?: React.FocusEventHandler;
	readonly type?: React.HTMLInputTypeAttribute;
	readonly inputRef?: React.Ref<
		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	>;
	readonly multiline?: boolean;
	readonly inputClassName?: string;
	readonly error?: string;
	readonly select?: boolean;
}

export const Field: React.FC<FieldProps> = ({
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
	const rootClasses = cn(
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
			ref={inputRef as React.Ref<HTMLSelectElement>}
		/>
	) : multiline ? (
		<Textarea
			className={inputClassName}
			{...input}
			id={id}
			ref={inputRef as React.Ref<HTMLTextAreaElement>}
		/>
	) : (
		<Input
			className={inputClassName}
			{...input}
			id={id}
			ref={inputRef as React.Ref<HTMLInputElement>}
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
