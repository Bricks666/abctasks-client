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
}

export const TextField = <T,>({
	control,
	name,
	...props
}: TextFieldProps<T>) => {
	const { field } = useController({
		name,
		control,
	});

	const { onBlur, onChange, ref, value } = field;

	return (
		<Field
			name={name}
			value={value as string | number}
			onChange={onChange}
			onBlur={onBlur}
			inputRef={ref}
			{...props}
		/>
	);
};
