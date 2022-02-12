import React, { PropsWithChildren, useCallback } from "react";
import { Control, FieldPath, useController } from "react-hook-form";
import ReactSelect, { StylesConfig } from "react-select";
import { ClassNameProps } from "../../interfaces/common";

export interface SelectValues<T = string | number> {
	readonly value: T;
	readonly label: string;
}
interface SelectComponentProps<FormValues> extends ClassNameProps {
	readonly options: SelectValues[];
	readonly styles?: StylesConfig<SelectValues>;
	readonly control: Control<FormValues>;
	readonly name: FieldPath<FormValues>;
}

export const Select = <FormValues,>({
	className,
	options,
	styles,
	children,
	control,
	name,
}: PropsWithChildren<SelectComponentProps<FormValues>>) => {
	const { field, formState } = useController({
		control,
		name,
	});
	const { isSubmitting } = formState;
	return (
		<label>
			{children}
			{/* TODO: Исправить типизацию, там какая то очень длинная ошибка */}
			<ReactSelect
				options={options as unknown[]}
				styles={styles as StylesConfig<unknown>}
				className={className}
				isDisabled={isSubmitting}
				{...field}
			/>
		</label>
	);
};
