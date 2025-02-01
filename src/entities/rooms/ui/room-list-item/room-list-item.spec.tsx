import { describe, expect, test } from 'vitest';

import { RenderResult, defaultRoom, render } from '~/test-utils';

import { RoomListItem, RoomListItemProps } from './room-list-item';

describe('entities/rooms/ui/room-list-item/room-list-item.tsx', () => {
	let wrapper: RenderResult;

	const defaultProps: RoomListItemProps = {
		className: 'classname',
		room: defaultRoom,
	};

	const createComponent = (props?: Partial<RoomListItemProps>) => {
		wrapper = render(<RoomListItem {...defaultProps} {...props} />);
	};

	const findListItem = () => wrapper.getByRole('listitem');

	test('should render list item', () => {
		createComponent();

		expect(findListItem()).toMatchSnapshot();
	});
});
