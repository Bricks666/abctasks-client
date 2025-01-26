import { urlAtom } from '@reatom/url';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { RenderResult, TestCtx, createTestCtx, render } from '~/test-utils';

import { PAGE_SEARCH_PARAM_NAME } from '@/shared/configs';

import { ActivitiesPagination } from './pagination';

describe('features/activities/activities-pagination/ui/pagination.tsx', () => {
	let wrapper: RenderResult;
	let ctx: TestCtx;
	const onPageChanged = vi.fn();
	const pageCount = 10;

	const createComponent = () => {
		wrapper = render(
			<ActivitiesPagination
				onPageChanged={onPageChanged}
				pageCount={pageCount}
				className='classname'
			/>,
			{
				ctx,
			}
		);
	};

	const findPagination = () => wrapper.getByRole('navigation');
	const findCurrentButton = (page: number) =>
		wrapper.getByRole('link', { name: `page ${page}`, });
	const findAnotherButton = (page: number) =>
		wrapper.getByRole('link', { name: `Go to page ${page}`, });

	beforeEach(() => {
		ctx = createTestCtx();

		urlAtom.go(ctx, '/', true);
	});

	afterEach(() => {
		window.location.href = '/';
	});

	test('should render pagination', () => {
		createComponent();

		expect(findPagination()).toMatchSnapshot();
	});

	test('should first button to be selected by default', () => {
		createComponent();

		const button = findCurrentButton(1);

		expect(button).toHaveAttribute('aria-current', 'true');
	});

	test('should scroll page to top on page change', async () => {
		createComponent();

		const button = findAnotherButton(2);

		await wrapper.user.click(button);

		expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, });
	});

	test('should change page on click on another page', async () => {
		createComponent();

		const button = findAnotherButton(2);

		await wrapper.user.click(button);

		expect(onPageChanged).toHaveBeenCalledWith({ page: 2, });
		expect(button).toHaveAttribute('aria-current', 'true');
	});

	test('should save opened page in url', async () => {
		createComponent();

		const button = findAnotherButton(2);

		await wrapper.user.click(button);

		expect(window.location.search).toContain(`${PAGE_SEARCH_PARAM_NAME}=2`);
	});
});
