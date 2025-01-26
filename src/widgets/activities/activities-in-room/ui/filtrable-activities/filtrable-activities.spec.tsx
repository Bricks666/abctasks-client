import { urlAtom } from '@reatom/url';
import { beforeEach, describe, expect, test } from 'vitest';

import {
	RenderResult,
	TestCtx,
	act,
	createTestCtx,
	defaultRoom,
	handlers,
	render,
	screen,
	server,
	users,
	waitFor
} from '~/test-utils';

import { FiltrableActivities } from './filtrable-activities';

describe('widgets/activities/activities-in-room/ui/filtrable-activities/filtrable-activities.tsx', () => {
	let ctx: TestCtx;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(
			<FiltrableActivities className='classname' roomId={defaultRoom.id} />,
			{ ctx, }
		);
	};

	const findRoot = () => wrapper.container.querySelector('section')!;
	const findOpenButton = () =>
		wrapper.getByRole('button', { name: 'actions.filter_activities.title', });
	const findSubmitButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.filter_activities.actions.submit',
		});
	const findActionsField = () =>
		wrapper.getByRole('combobox', {
			name: 'actions.filter_activities.fields.action',
		});
	const findUsersField = () =>
		wrapper.getByRole('combobox', {
			name: 'actions.filter_activities.fields.users',
		});
	const findActivities = () => wrapper.getAllByRole('listitem');
	const findActivityCardsByType = (type: string) =>
		wrapper.getAllByText(`type.${type}`);
	const findPaginationButton = (page: number) =>
		wrapper.getByRole('link', { name: `Go to page ${page}`, });
	const findCurrentPaginationButton = (page: number) =>
		wrapper.getByRole('link', { name: `page ${page}`, });
	const findRetryButton = () =>
		wrapper.getByRole('button', { name: 'actions.retry', });
	const openFilters = async () => {
		const button = findOpenButton();

		await wrapper.user.click(button);
	};

	beforeEach(() => {
		ctx = createTestCtx();

		urlAtom.go(ctx, '/', true);
	});

	test('should render widget with header, filters, activities list and pagination', async () => {
		await act(async () => createComponent());

		expect(findRoot()).toMatchSnapshot('activities');
	});

	test('should render empty list with text if there is no items', async () => {
		await act(async () => createComponent());

		await openFilters();
		const usersPicker = findUsersField();

		await act(async () => {
			await wrapper.user.click(usersPicker);
			await wrapper.user.keyboard(users[1].username);
			await waitFor(async () => {
				await wrapper.user.click(screen.getByRole('option'));
			});
		});

		await wrapper.user.click(findSubmitButton());

		await waitFor(() => {
			expect(wrapper.getByText('list.empty_text')).toBeInTheDocument();
		});

		expect(findRoot()).toMatchSnapshot('empty list');
	});

	test('should show error message if error occured during request', async () => {
		server.use(handlers.activities.error.getAll);

		await act(async () => createComponent());

		await waitFor(() => {
			expect(
				wrapper.getByText('actions.retry_actions.text')
			).toBeInTheDocument();
		});

		expect(findRoot()).toMatchSnapshot('error');
	});

	test('should render filtred list when filters has been set', async () => {
		await act(async () => createComponent());

		await openFilters();
		const actionField = findActionsField();

		await act(async () => {
			await wrapper.user.click(actionField);
			await wrapper.user.keyboard('create');
			await waitFor(async () => {
				await wrapper.user.click(screen.getByRole('option'));
			});
		});

		await wrapper.user.click(findSubmitButton());

		expect(() => findActivityCardsByType('updated')).toThrow();
		expect(() => findActivityCardsByType('removed')).toThrow();
	});

	test('should render another page of activities', async () => {
		await act(async () => createComponent());

		const activities = findActivities();

		await wrapper.user.click(findPaginationButton(2));

		const anotherPageActivities = findActivities();

		expect(activities).not.toStrictEqual(anotherPageActivities);
	});

	test('should render another page of activities with applied filters', async () => {
		await act(async () => createComponent());

		await openFilters();
		const actionField = findActionsField();

		await act(async () => {
			await wrapper.user.click(actionField);
			await wrapper.user.keyboard('create');
			await waitFor(async () => {
				await wrapper.user.click(screen.getByRole('option'));
			});
		});

		await wrapper.user.click(findSubmitButton());
		await wrapper.user.click(findPaginationButton(2));

		expect(() => findActivityCardsByType('updated')).toThrow();
		expect(() => findActivityCardsByType('removed')).toThrow();
	});

	test.skip('should reset page on filters change', async () => {
		await act(async () => createComponent());

		await wrapper.user.click(findPaginationButton(2));

		await waitFor(() => {
			expect(findCurrentPaginationButton(2)).toBeInTheDocument();
		});

		await openFilters();
		const actionField = findActionsField();

		await act(async () => {
			await wrapper.user.click(actionField);
			await wrapper.user.keyboard('create');
			await waitFor(async () => {
				await wrapper.user.click(screen.getByRole('option'));
			});
		});

		await wrapper.user.click(findSubmitButton());

		await waitFor(() => {
			expect(findCurrentPaginationButton(1)).toBeInTheDocument();
		});
	});

	test.skip('should refetch data on click refetch button', async () => {
		server.use(handlers.activities.error.getAll);

		await act(async () => createComponent());

		await waitFor(() => {
			expect(
				wrapper.getByText('actions.retry_actions.text')
			).toBeInTheDocument();
		});

		server.use(handlers.activities.success.getAll);

		await wrapper.user.click(findRetryButton());

		await waitFor(() => {
			expect(findActivityCardsByType('create')).toBeInTheDocument();
		});
	});
});
