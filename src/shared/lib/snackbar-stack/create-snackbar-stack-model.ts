/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlertProps } from '@mui/material';
import { createEvent, createStore, sample } from 'effector';
import { debug, delay } from 'patronum';
import { VoidFunction } from '@/shared/types';
import {
	BASE_MAX_COUNT,
	BASE_TIMEOUT,
	BASE_POSITION,
	BASE_DURATION
} from './config';
import { getSlideDirection } from './lib';
import { CreateSnackbarOptions, FabricOptions, Snackbar } from './types';

export const createSnackbarStackModel = (
	options: Partial<FabricOptions> = {}
) => {
	const {
		maxCount = BASE_MAX_COUNT,
		timeout = BASE_TIMEOUT,
		position = BASE_POSITION,
		duration = BASE_DURATION,
		...rest
	} = options;

	const $id = createStore(1);
	const $config = createStore<FabricOptions>({
		maxCount,
		timeout,
		position,
		duration,
		...rest,
	});

	const $items = createStore<Snackbar[]>([]);
	const $isEmpty = $items.map((n) => !n.length);

	const create = createEvent<CreateSnackbarOptions>();
	const close = createEvent<number>();
	const created = createEvent<Snackbar>();
	const closed = createEvent<number>();
	const mounted = createEvent<Snackbar>();
	const unmounted = createEvent<number>();

	sample({
		clock: create,
		source: { id: $id, config: $config, },
		fn: (
			{ id, config: { maxCount: _, position, ...config }, },
			options
		): Snackbar => {
			const direction = getSlideDirection(position);

			const snackbar = {
				...config,
				...options,
				direction,
				onClose: () => close(id),
				onUnmounted: () => unmounted(id),
				onMounted: () => mounted(snackbar),
				open: true,
				id,
			};
			return snackbar;
		},
		target: created,
	});

	sample({
		clock: created,
		source: { notifications: $items, config: $config, },
		fn: ({ notifications, config, }, notification) => {
			const { maxCount, } = config;
			if (notifications.length === maxCount) {
				return [
					{ ...notifications[0], open: false, },
					...notifications.slice(1),
					notification
				];
			}
			return [...notifications, notification];
		},
		target: $items,
	});

	sample({
		clock: created,
		source: $id,
		fn: (id, { id: instanceId, }) => {
			return id === instanceId ? id + 1 : Math.max(id, instanceId);
		},
		target: $id,
	});

	const timeoutExpired = delay({
		source: sample({
			clock: mounted,
			source: $config,
			fn: ({ timeout, }, { id: instanceId, }) => ({ timeout, instanceId, }),
		}),
		timeout: (payload) => {
			return payload.timeout;
		},
	});

	debug(timeoutExpired, created);

	sample({
		clock: timeoutExpired,
		fn: (data) => data.instanceId,
		target: close,
	});

	sample({
		clock: close,
		source: $items,
		fn: (notifications, id) => {
			return notifications.map((notification) =>
				notification.id === id ? { ...notification, open: false, } : notification
			);
		},
		target: $items,
	});

	sample({
		clock: unmounted,
		source: $items,
		fn: (notifications, id) => {
			return notifications.filter((notification) => notification.id !== id);
		},
		target: $items,
	});

	sample({
		clock: unmounted,
		target: closed,
	});

	return {
		$items,
		$position: $config.map((config) => config.position),
		$isEmpty,
		create,
		close,
		created,
		closed,
	};
};
