import React, { HTMLInputTypeAttribute } from "react";
import { Control, Path, useController } from "react-hook-form";
import { AnyObject, ClassNameProps } from "@/interfaces/common";
import { Field } from "@/ui/Field";

interface TextFieldProps<T extends AnyObject> extends ClassNameProps {
	readonly control: Control<T>;
	readonly name: Path<T>;
	readonly label?: string;
	readonly disabled?: boolean;
	readonly readOnly?: boolean;
	readonly type?: HTMLInputTypeAttribute;
	readonly multiline?: boolean;
	readonly required?: boolean;
	readonly inputClassName?: string;
}

export const TextField = <T,>({
	control,
	name,
	...props
}: TextFieldProps<T>) => {
	const { field, fieldState } = useController({
		name,
		control,
	});

	const { onBlur, onChange, ref, value } = field;
	const { error } = fieldState;
	console.log(error);
	return (
		<Field
			name={name}
			value={value as string | number}
			onChange={onChange}
			onBlur={onBlur}
			inputRef={ref}
			error={error?.message}
			{...props}
		/>
	);
};
