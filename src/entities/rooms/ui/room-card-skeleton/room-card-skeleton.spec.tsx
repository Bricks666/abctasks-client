import { describe, expect, test } from 'vitest';

import { RenderResult, render } from '~/test-utils';

import { RoomCardSkeleton, RoomCardSkeletonProps } from './room-card-skeleton';

describe('entities/rooms/ui/room-card-skeleton/room-card-skeleton.tsx', () => {
	let wrapper: RenderResult;

	const defaultProps: RoomCardSkeletonProps = {
		className: 'classname',
	};

	const createComponent = (props?: Partial<RoomCardSkeletonProps>) => {
		wrapper = render(<RoomCardSkeleton {...defaultProps} {...props} />);
	};

	const findListItem = () => wrapper.getByRole('listitem');

	test('should render list item', () => {
		createComponent();

		expect(findListItem()).toMatchSnapshot();
	});
});
