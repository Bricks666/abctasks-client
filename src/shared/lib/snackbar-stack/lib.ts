import { createStore, is, Store } from 'effector';
import { Position, Direction } from './types';

/**
 *
 * @param {Position} position
 * @returns {Direction} Direction calculated from position
 */
export const getSlideDirection = (position: Position): Direction => {
	const isTop = position.vertical === 'top';
	const isBottom = position.vertical === 'bottom';
	const isRight = position.horizontal === 'right';
	const isCenter = position.horizontal === 'center';

	if (isRight) {
		return 'left';
	}

	if (isCenter && isBottom) {
		return 'up';
	}
	if (isCenter && isTop) {
		return 'down';
	}

	return 'right';
};

// eslint-disable-next-line effector/enforce-store-naming-convention
export const normalizeStaticOrReactive = <T>(value: Store<T> | T): Store<T> => {
	if (is.store(value)) {
		return value as Store<T>;
	}

	return createStore(value as T);
};
