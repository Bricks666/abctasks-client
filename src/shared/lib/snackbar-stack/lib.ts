import { Position, Direction } from './types';

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
