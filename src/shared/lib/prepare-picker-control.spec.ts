import { describe, expect, test, vi } from 'vitest';

import {
	preparePickerHandler,
	preparePickerSelectedValue
} from './prepare-picker-control';

describe('shread/lib/prepare-picker-control', () => {
	const values = [
		{ id: 1, name: 'strom', },
		{ id: 2, name: 'strom', },
		{ id: 3, name: 'strom', }
	];
	const value = values[0];
	const selected = [2, 3];
	const event = {};
	const onChange = vi.fn();

	describe('preparePickerHandler', () => {
		test.each([
			{ value, result: value.id, },
			{ value: {}, result: null, }
		])(
			'should return handler to handle the single value if multiple=false. Value $value, result $result',
			({ value, result, }) => {
				const handleChange = preparePickerHandler({ onChange, }, 'id');

				handleChange(event, value);

				expect(onChange).toHaveBeenCalledWith(result);
			}
		);

		test.each([
			{ values, result: values.map((value) => value.id), },
			{ values: [], result: [], }
		])(
			'should return handle to handle multiple value if multiple=true. Values $values, result $result',
			({ result, values, }) => {
				const handleChange = preparePickerHandler(
					{ onChange, multiple: true, },
					'id'
				);

				handleChange(event, values);

				expect(onChange).toHaveBeenCalledWith(result);
			}
		);
	});

	describe('preparePickerSelectedValue', () => {
		test.each([
			{
				selected: selected[0],
				value: values[1],
			},
			{
				selected: 123,
				value: null,
			}
		])(
			'should return the single value if multiple=false. Selected $selected, value $value',
			({ selected, value, }) => {
				const selectedValue = preparePickerSelectedValue(
					{ value: selected, },
					values,
					'id'
				);

				expect(selectedValue).toBe(value);
			}
		);

		test.each([
			{
				selected,
				value: values.slice(1),
			},
			{
				selected: [123],
				value: [],
			}
		])(
			'should return multiple value if multiple=true. Selected $selected, value $value',
			({ selected, value, }) => {
				const selectedValue = preparePickerSelectedValue(
					{ value: selected, multiple: true, },
					values,
					'id'
				);

				expect(selectedValue).toStrictEqual(value);
			}
		);
	});
});
