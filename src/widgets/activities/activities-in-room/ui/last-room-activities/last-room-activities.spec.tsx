import { beforeEach, describe, expect, test } from 'vitest';

import {
	RenderResult,
	TestCtx,
	act,
	createTestCtx,
	defaultRoom,
	handlers,
	render,
	rooms,
	server,
	waitFor
} from '~/test-utils';

import {
	LastRoomActivities,
	LastRoomActivitiesProps
} from './last-room-activities';

describe('widgets/activities/activities-in-room/ui/last-room-activities/last-room-activities.tsx', () => {
	let ctx: TestCtx;
	let wrapper: RenderResult;

	const defaultProps: LastRoomActivitiesProps = {
		roomId: defaultRoom.id,
		className: 'classnames',
		disableBorder: false,
	};

	const createComponent = (props?: Partial<LastRoomActivitiesProps>) => {
		wrapper = render(<LastRoomActivities {...defaultProps} {...props} />, {
			ctx,
		});
	};

	const findRoot = () => wrapper.container.querySelector('section')!;
	const findActivityCardsByType = (type: string) =>
		wrapper.getAllByText(`type.${type}`);
	const findRetryButton = () =>
		wrapper.getByRole('button', { name: 'actions.retry', });

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should render title, list with 6 items and button to go to all list', async () => {
		await act(async () => createComponent());

		expect(findRoot()).toMatchSnapshot('last activities');
	});

	test('should render empty list with text if there is no items', async () => {
		await act(async () => createComponent({ roomId: rooms[1].id, }));

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
