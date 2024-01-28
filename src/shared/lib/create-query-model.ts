import { querySync } from 'atomic-router';
import { Event, Store, createEvent, createStore, sample } from 'effector';

import { controls } from '@/shared/configs';

export interface CreateQueryModelParams<T> {
	readonly name: string;
	readonly defaultValue: T;
}

export interface QueryModel<T> {
	readonly $value: Store<T>;
	readonly $isEmpty: Store<boolean>;
	readonly reset: Event<void>;
	readonly set: Event<T>;
}

export const createQueryModel = <T>(
	params: CreateQueryModelParams<T>
): QueryModel<T> => {
	const { name, defaultValue, } = params;

	const $value = createStore<T>(defaultValue);
	const $isEmpty = $value.map((value) => value === defaultValue);
	const set = createEvent<T>();
	const reset = createEvent();

	querySync({
		controls,
		source: {
			[name]: $value,
		},
	});

	sample({
		clock: set,
		target: $value,
	});

	sample({
		clock: reset,
		target: $value.reinit!,
	});

	return {
		$value,
		$isEmpty,
		set,
		reset,
	};
};
