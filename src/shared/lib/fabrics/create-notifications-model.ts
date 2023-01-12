/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlertProps } from '@mui/material';
import { createEvent, createStore, sample } from 'effector';
import { debug, delay } from 'patronum';
import { VoidFunction } from '@/shared/types';

export type Vertical = 'top' | 'bottom';
export type Horizontal = 'left' | 'right' | 'center';
export interface Position {
	readonly horizontal: Horizontal;
	readonly vertical: Vertical;
}

interface BaseOptions {
	readonly duration?: number;
	readonly variant?: AlertProps['variant'];
}

export interface FabricOptions extends BaseOptions {
	readonly timeout: number;
	readonly maxCount: number;
	readonly position: Position;
}

export interface Notification extends BaseOptions {
	readonly instanceId: number;
	readonly message: string;
	readonly open: boolean;
	readonly onClose: VoidFunction;
	readonly onMounted: VoidFunction;
	readonly onUnmounted: VoidFunction;
	readonly slideDirection: 'up' | 'down' | 'left' | 'right';
	readonly color?: AlertProps['color'];
}

const BASE_DURATION = 250;
const BASE_TIMEOUT = 3000;
const BASE_MAX_COUNT = 3;
const BASE_POSITION: Position = {
	horizontal: 'left',
	vertical: 'bottom',
};

export interface CreateNotificationOptions
	extends Pick<Notification, 'message' | 'color' | 'variant'> {}

export const createNotificationsModel = (
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

	const $notifications = createStore<Notification[]>([]);
	const $isEmpty = $notifications.map((n) => !n.length);

	const create = createEvent<CreateNotificationOptions>();
	const close = createEvent<number>();
	const created = createEvent<Notification>();
	const closed = createEvent<number>();
	const mounted = createEvent<Notification>();
	const unmounted = createEvent<number>();

	sample({
		clock: create,
		source: { id: $id, config: $config, },
		fn: (
			{ id, config: { maxCount: _, position, ...config }, },
			options
		): Notification => {
			const isTop = position.vertical === 'top';
			const isBottom = position.vertical === 'bottom';
			const isRight = position.horizontal === 'right';
			const isCenter = position.horizontal === 'center';

			let slideDirection: Notification['slideDirection'] = 'right';

			if (isRight) {
				slideDirection = 'left';
			} else if (isCenter && isBottom) {
				slideDirection = 'up';
			} else if (isCenter && isTop) {
				slideDirection = 'down';
			}

			const notification = {
				...config,
				...options,
				slideDirection,
				onClose: () => close(id),
				onUnmounted: () => unmounted(id),
				onMounted: () => mounted(notification),
				open: true,
				instanceId: id,
			};
			return notification;
		},
		target: created,
	});

	sample({
		clock: created,
		source: { notifications: $notifications, config: $config, },
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
		target: $notifications,
	});

	sample({
		clock: created,
		source: $id,
		fn: (id, { instanceId, }) => {
			return id === instanceId ? id + 1 : Math.max(id, instanceId);
		},
		target: $id,
	});

	const timeoutExpired = delay({
		source: sample({
			clock: mounted,
			source: $config,
			fn: ({ timeout, }, { instanceId, }) => ({ timeout, instanceId, }),
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
		source: $notifications,
		fn: (notifications, id) => {
			return notifications.map((notification) =>
				notification.instanceId === id
					? { ...notification, open: false, }
					: notification
			);
		},
		target: $notifications,
	});

	sample({
		clock: unmounted,
		source: $notifications,
		fn: (notifications, id) => {
			return notifications.filter(
				(notification) => notification.instanceId !== id
			);
		},
		target: $notifications,
	});

	sample({
		clock: unmounted,
		target: closed,
	});

	return {
		$notifications,
		$position: $config.map((config) => config.position),
		$maxCount: $config.map((config) => config.maxCount),
		$isEmpty,
		create,
		close,
		created,
		closed,
	};
};
