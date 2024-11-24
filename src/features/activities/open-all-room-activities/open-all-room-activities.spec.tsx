import { RenderResult, fireEvent, render } from '@testing-library/react';
import { RouterProvider } from 'atomic-router-react';
import { Scope, allSettled, fork } from 'effector';
import { Provider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test } from 'vitest';

import { router, routes } from '@/shared/configs';

import { OpenAllRoomActivities } from './open-all-room-activities';

describe('features/activities/open-all-room-activities/open-all-room-activities', () => {
	let wrapper: RenderResult;
	let scope: Scope;
	const roomId = 123;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RouterProvider router={router}>
					<OpenAllRoomActivities />
				</RouterProvider>
			</Provider>
		);
	};
	const findLink = () =>
		wrapper.getByRole('link', { name: 'blocks.last_activities.actions.open', });

	beforeEach(async () => {
		scope = fork();
		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(),
		});
		await allSettled(routes.room.tasks.open, {
			scope,
			params: { id: roomId, },
		});
	});

	test('should render link looks like button', () => {
		createComponent();

		expect(findLink()).toMatchSnapshot();
	});

	test('should navigate to activities room on click', () => {
		createComponent();

		const link = findLink();

		fireEvent.click(link);

		expect(scope.getState(router.$path)).toBe(`/rooms/${roomId}/activities`);
	});
});
