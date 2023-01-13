import { combine, createEvent, createStore, sample } from 'effector';
import { delay } from 'patronum';
import {
	BASE_MAX_COUNT,
	BASE_TIMEOUT,
	BASE_POSITION,
	BASE_DURATION,
	BASE_CLOSABLE,
	BASE_VARIANT
} from './config';
import { normalizeStaticOrReactive } from './lib';
import {
	CreateSnackbarOptions,
	FabricConfig,
	Snackbar,
	SnackbarStackModel,
	StaticFabricConfig
} from './types';

/**
 *
 * @param {Partial<FabricConfig>} config configuration of fabric
 * @returns {SnackbarStackModel} created model
 *
 * @public
 */
export const createSnackbarStackModel = (
	config: Partial<FabricConfig> = {}
): SnackbarStackModel => {
	const { closable, duration, maxCount, position, timeout, variant, } = config;
	const $id = createStore(1);
	const $position = normalizeStaticOrReactive(position ?? BASE_POSITION);
	const $maxCount = normalizeStaticOrReactive(maxCount ?? BASE_MAX_COUNT);
	const $timeout = normalizeStaticOrReactive(timeout ?? BASE_TIMEOUT);
	const $duration = normalizeStaticOrReactive(duration ?? BASE_DURATION);
	const $closable = normalizeStaticOrReactive(closable ?? BASE_CLOSABLE);
	const $variant = normalizeStaticOrReactive(variant ?? BASE_VARIANT);

	const $snackbarConfig = combine({
		timeout: $timeout,
		duration: $duration,
		closable: $closable,
		variant: $variant,
	});
	const $config = combine(
		$snackbarConfig,
		$position,
		$maxCount,
		(baseConfig, position, maxCount) =>
			({ ...baseConfig, position, maxCount, } as StaticFabricConfig)
	);

	const $items = createStore<Snackbar[]>([]);

	const create = createEvent<CreateSnackbarOptions>();
	const close = createEvent<number>();
	const created = createEvent<Snackbar>();
	const closed = createEvent<number>();
	const mounted = createEvent<number>();
	const unmounted = createEvent<number>();

	sample({
		clock: create,
		source: { id: $id, config: $snackbarConfig, },
		fn: ({ id, config, }, options): Snackbar => {
			return {
				...config,
				...options,
				open: true,
				id,
			};
		},
		target: created,
	});

	sample({
		clock: created,
		source: { notifications: $items, maxCount: $maxCount, },
		fn: ({ notifications, maxCount, }, notification) => {
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
			source: $items,
			fn: (items, id) => {
				const item = items.find((item) => item.id === id);
				if (!item) {
					return { id, timeout: 0, };
				}

				return { id, timeout: item.timeout, };
			},
		}),
		timeout: (payload) => {
			return payload.timeout;
		},
	});

	sample({
		clock: timeoutExpired,
		fn: (data) => data.id,
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
		$config,
		create,
		close,
		created,
		closed,
		mounted,
		unmounted,

		'@@unitShape': () => ({
			items: $items,
			create,
			close,
			created,
			closed,
			mounted,
			unmounted,
		}),
	};
};
