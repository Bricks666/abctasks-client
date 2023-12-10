import { createEvent, createStore, sample } from 'effector';

export const createFlag = (defaultValue = false) => {
	const $flag = createStore<boolean>(defaultValue);

	const enable = createEvent();
	const toggle = createEvent();
	const disable = createEvent();

	sample({
		clock: toggle,
		source: $flag,
		fn: (flag) => !flag,
		target: $flag,
	});

	sample({
		clock: enable,
		fn: () => true,
		target: $flag,
	});

	sample({
		clock: disable,
		fn: () => false,
		target: $flag,
	});

	return {
		$flag,
		enable,
		disable,
		toggle,
		'@@unitShape': () => ({ flag: $flag, enable, disable, toggle, }),
	};
};
