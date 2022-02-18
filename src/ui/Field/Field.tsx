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

import FieldStyle from "./Field.module.css";

export interface FieldProps extends ClassNameProps {
	readonly value: string | number;
	readonly name: string;
	readonly inputId?: string;
	readonly label?: string;
	readonly onChange: ChangeEventHandler;
	readonly onBlur?: FocusEventHandler;
	readonly onFocus?: FocusEventHandler;
	readonly type?: HTMLInputTypeAttribute;
	readonly inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement>;
	readonly multiline?: boolean;
}

export const Field: FC<FieldProps> = ({
	className,
	label,
	inputId,
	name,
	inputRef,
	multiline,
	...input
}) => {
	const id = inputId || name;

	const fieldLabel = label ? (
		<InputLabel HTMLFor={id}>{label}</InputLabel>
	) : null;

	const control = multiline ? (
		<Textarea {...input} id={id} ref={inputRef as Ref<HTMLTextAreaElement>} />
	) : (
		<Input {...input} id={id} ref={inputRef as Ref<HTMLInputElement>} />
	);

	return (
		<div className={classNames(FieldStyle.field, className)}>
			{fieldLabel}
			{control}
		</div>
	);
};
