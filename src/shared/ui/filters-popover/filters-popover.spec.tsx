import { beforeEach, describe, expect, test } from 'vitest';

import { useToggle } from '@/shared/lib';
import { deviceInfoModel, Devices } from '@/shared/models';

import { FiltersPopover, FiltersPopoverProps } from './filters-popover';

import {
	act,
	allSettled,
	fork,
	render,
	RenderResult,
	Scope
} from '~/test-utils';

describe('shared/ui/filters-popover/filters-popover', () => {
	let wrapper: RenderResult;
	let scope: Scope;

	const defaultProps: Omit<FiltersPopoverProps, 'open' | 'onOpen' | 'onClose'> =
		{
			children: ({ isPopup, }) => <div>{isPopup ? 'popup' : 'popover'}</div>,
			icon: <div>icon</div>,
			title: 'title',
			className: 'classname',
			slots: {
				actions: <div>actions</div>,
			},
		};

	const Component = (
		props: Omit<FiltersPopoverProps, 'open' | 'onOpen' | 'onClose'>
	) => {
		const [open, { toggleOn: onOpen, toggleOff: onClose, }] = useToggle(false);

		return (
			<FiltersPopover
				{...props}
				open={open}
				onOpen={onOpen}
				onClose={onClose}
			/>
		);
	};

	const createComponent = (
		props: Omit<
			FiltersPopoverProps,
			'open' | 'onOpen' | 'onClose'
		> = defaultProps
	) => {
		wrapper = render(<Component {...props} />, { scope, });
	};
	const findButton = () =>
		wrapper.getByRole('button', { name: defaultProps.title, });
	const findPopup = () =>
		wrapper.getByRole('dialog', { name: defaultProps.title, });
	const findPopover = () =>
		wrapper.getByRole('presentation', { name: defaultProps.title, });

	const setDeviceInfo = (device: Devices) =>
		allSettled(deviceInfoModel.$device, { scope, params: device, });
	const clickButton = () => wrapper.user.click(findButton());

	beforeEach(() => {
		scope = fork();
	});

	test('should render button', () => {
		createComponent();

		expect(wrapper.container).toMatchSnapshot('closed');
	});

	test.each([
		'desktop-large',
		'desktop-small',
		'tablet-horizontal'
	] as Devices[])(
		'should toggle popover on button click if current device is %s',
		async (device) => {
			createComponent();

			await act(() => setDeviceInfo(device));
			await clickButton();

			expect(findPopover()).toMatchSnapshot(`popover ${device}`);
		}
	);

	test.each(['tablet-vertical', 'mobile'] as Devices[])(
		'should open popup on button click if current device is %s',
		async (device) => {
			createComponent();

			await act(() => setDeviceInfo(device));
			await clickButton();

			expect(findPopup()).toMatchSnapshot(`popup ${device}`);
		}
	);

	test('should update aria info on button', async () => {
		createComponent();

		const button = findButton();

		await clickButton();

		expect(button).toHaveAttribute('aria-expanded', 'true');
	});

	test('should close poppover on second click on button', async () => {
		createComponent();

		const button = findButton();

		await clickButton();

		await wrapper.user.click(button);

		expect(findPopover).toThrow();
	});
});
