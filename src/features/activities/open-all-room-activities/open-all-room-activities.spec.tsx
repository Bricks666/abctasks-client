import { beforeEach, describe, expect, test } from 'vitest';

import { RenderResult, TestCtx, createTestCtx, render } from '~/test-utils';

import { ROUTES } from '@/shared/configs';

import { OpenAllRoomActivities } from './open-all-room-activities';

describe('features/activities/open-all-room-activities/open-all-room-activities', () => {
	let wrapper: RenderResult;
	let ctx: TestCtx;
	const roomId = 123;

	const createComponent = () => {
		wrapper = render(<OpenAllRoomActivities roomId={roomId} />, { ctx, });
	};
	const findLink = () =>
		wrapper.getByRole('link', { name: 'blocks.last_activities.actions.open', });

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should render link looks like button', () => {
		createComponent();

		expect(findLink()).toMatchSnapshot();
	});

	test('should navigate to activities room on click', async () => {
		createComponent();

		const link = findLink();

		expect(link).toHaveAttribute(
			'href',
			ROUTES.room.activities.getPath({ id: roomId.toString(), })
		);
	});
});
