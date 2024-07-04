import { RenderResult, fireEvent, render } from '@testing-library/react';
import { Scope, fork } from 'effector';
import { Provider } from 'effector-react';
import { beforeEach, describe, expect, test } from 'vitest';

import { popupsMap } from '@/shared/configs';
import { popupsModel } from '@/shared/models';

import { RemoveInvitation } from './remove-invitation';

describe('features/invitation/remove-invitation/remove-invitation', () => {
	const id = 123;
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<RemoveInvitation id={id} />
			</Provider>
		);
	};

	const findButton = () =>
		wrapper.getByRole('button', {
			name: 'actions.remove_invitation.actions.open',
		});

	beforeEach(() => {
		scope = fork();
	});

	test('should render button', () => {
		createComponent();

		expect(findButton()).toMatchSnapshot();
	});

	test('should open confirm modal on click', () => {
		createComponent();

		const button = findButton();

		fireEvent.click(button);

		expect(scope.getState(popupsModel.$popups)).toContain(
			popupsMap.removeInvitation
		);
	});
});
