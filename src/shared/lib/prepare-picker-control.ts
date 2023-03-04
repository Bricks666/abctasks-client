import { PickerProps } from '../types';

export const preparePickerHandler = <
	O extends Record<string, any>,
	K extends keyof O,
	T extends O[K]
>(
		params: Pick<PickerProps<T>, 'multiple' | 'onChange'>,
		key: K
	) => {
	const { onChange, multiple, } = params;

	if (multiple) {
		return (_: unknown, data: O[]) => {
			(onChange as any)(data.map((tag) => tag[key]));
		};
	}

	return (_: unknown, data: O | null) => {
		(onChange as any)(data?.[key] || null);
	};
};

export const preparePickerSelectedValue = <
	O extends Record<string, any>,
	K extends keyof O,
	T extends O[K]
>(
		params: Pick<PickerProps<T>, 'multiple' | 'value'>,
		data: O[],
		key: K
	) => {
	const { value, multiple, } = params;

	if (multiple) {
		return data.filter((data) => (value as T[]).includes(data[key]));
	}

	return data.find((data) => data[key] === value) ?? null;
};
