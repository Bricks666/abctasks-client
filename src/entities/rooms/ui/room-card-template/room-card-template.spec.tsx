import { describe, expect, test } from 'vitest';

import { RenderResult, defaultRoom, render } from '~/test-utils';

import { RoomCardTemplate, RoomCardTemplateProps } from './room-card-template';

describe('entities/rooms/ui/room-card-template/room-card-template.tsx', () => {
	let wrapper: RenderResult;

	const defaultProps: RoomCardTemplateProps = {
		className: 'classname',
		room: defaultRoom,
	};

	const createComponent = (props?: Partial<RoomCardTemplateProps>) => {
		wrapper = render(<RoomCardTemplate {...defaultProps} {...props} />);
	};

	const findCard = () => wrapper.getByRole('listitem');

	test('should render card with name and description', () => {
		createComponent();

		expect(findCard()).toMatchSnapshot('without slots');
	});

	test('should render slots', () => {
		createComponent({
			slots: {
				'footer-actions': <button type='button'>Footer actions</button>,
				'header-action': <button type='button'>Header action</button>,
			},
		});

		expect(findCard()).toMatchSnapshot('with slots');
	});
});
