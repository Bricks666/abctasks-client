import { ListItem } from '@mui/material';
import { atom } from '@reatom/framework';
import { beforeEach, describe, expect, test } from 'vitest';

import { FriendlyList, FriendlyListProps } from './friendly-list';

import { RenderResult, TestCtx, createTestCtx, render } from '~/test-utils';

describe('src/shared/ui/friendly-list/friendly-list', () => {
	let ctx: TestCtx;
	let wrapper: RenderResult;

	const dataAtom = atom(
		[
			{
				value: 'value1',
			},
			{
				value: 'value2',
			},
			{
				value: 'value3',
			},
			{
				value: 'value4',
			}
		],
		'dataAtom'
	);
	const pendingAtom = atom(false, 'pendingAtom');
	const errorAtom = atom(null, 'errorAtom');

	const defaultProps: FriendlyListProps<unknown, { value: string }, Error> = {
		ErrorComponent: ({ error, }) => <span>{error.message}</span>,
		ItemComponent: ({ value, ...rest }) => (
			<ListItem {...rest}>{value}</ListItem>
		),
		SkeletonComponent: (props) => <ListItem {...props}>Skeleton</ListItem>,
		dataAtom,
		pendingAtom,
		errorAtom,
		emptyText: 'Empty text',
		getKey: ({ value, }) => value,
		skeletonsCount: 5,
		className: 'classname',
	};

	const createComponent = (
		props?: Partial<FriendlyListProps<any, any, Error>>
	) => {
		wrapper = render(<FriendlyList {...defaultProps} {...props} />, { ctx, });
	};

	const findRoot = () => wrapper.container.querySelector('div')!;

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should render list with items for each element', () => {
		createComponent();

		expect(findRoot()).toMatchSnapshot('simple variant');
	});

	test('should render loading spinner if list is loading', () => {
		pendingAtom(ctx, true);

		createComponent();

		expect(findRoot()).toMatchSnapshot('loading variant');
	});

	test('should render error component if is error', () => {
		errorAtom(ctx, new Error('error'));

		createComponent();

		expect(findRoot()).toMatchSnapshot('message variant');
	});

	test('should render empty phrase if there is no items', () => {
		dataAtom(ctx, []);

		createComponent();

		expect(findRoot()).toMatchSnapshot('emtpy variant');
	});

	test('should map data if it is not array', () => {
		dataAtom(ctx, {
			items: ctx.get(dataAtom),
		});

		createComponent({ getData: ({ items, }) => items, });

		expect(findRoot()).toMatchSnapshot('with getData');
	});

	describe('slots', () => {
		test('should render before slot', () => {
			createComponent({
				slots: {
					before: <div>Before slot</div>,
				},
			});

			expect(findRoot()).toMatchSnapshot('before slot');
		});

		test('should render after slot', () => {
			createComponent({
				slots: {
					after: <div>After slot</div>,
				},
			});

			expect(findRoot()).toMatchSnapshot('after slot');
		});

		test('should render both slots', () => {
			createComponent({
				slots: {
					before: <div>Before slot</div>,
					after: <div>After slot</div>,
				},
			});

			expect(findRoot()).toMatchSnapshot('both slots');
		});
	});

	test('should disbale borders if disableBorder=true', () => {
		createComponent({
			disableBorder: true,
		});

		expect(findRoot()).toMatchSnapshot('disabled borders');
	});
});
