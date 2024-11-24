import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { OpenRoom } from './open-room';

import {
	RenderResult,
	Scope,
	act,
	fork,
	render,
	useTestRouter
} from '~/test-utils';

describe('features/rooms/open-room/open-room', () => {
	const id = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(<OpenRoom id={id} />, { scope, router, });
	};
	const findLink = () => wrapper.getByRole('link', { name: 'actions.open', });

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });

		await act(async () => createComponent());
	});

	test('should render link with button styles', () => {
		expect(findLink()).toMatchSnapshot();
	});

	test('should navigate to room page', async () => {
		const link = findLink();

		await wrapper.user.click(link);

		expect(scope.getState(router.$path)).toBe(`/rooms/${id}/tasks`);
	});
});
