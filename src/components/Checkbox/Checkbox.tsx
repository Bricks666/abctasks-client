import React from "react";
import { Control, Path, useController } from "react-hook-form";
import { ClassNameProps } from "@/interfaces/common";
import { Checkbox as CheckboxUI } from "@/ui/Checkbox";

interface CheckboxProps<T> extends ClassNameProps {
	readonly control: Control<T>;
	readonly name: Path<T>;
	readonly disabled?: boolean;
	readonly required?: boolean;
	readonly readOnly?: boolean;
	readonly label?: string;
}

export const Checkbox = <T,>({
	control,
	name,
	label,
	...props
}: CheckboxProps<T>) => {
	const { field } = useController({ control, name });
	const { onBlur, onChange, ref, value } = field;
	return (
		<CheckboxUI
			name={name}
			onChange={onChange}
			onBlur={onBlur}
			inputRef={ref}
			checked={value as boolean}
			{...props}
		>
			{label}
		</CheckboxUI>
	);
};
