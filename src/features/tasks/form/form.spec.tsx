import { fireEvent, screen, waitFor } from '@testing-library/react';
import { allSettled } from 'effector';
import { debug } from 'patronum';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { tagsModel } from '@/entities/tags';

import { router } from '@/shared/configs';

import { TaskForm } from './form';
import { create as createForm } from './model';

import {
	createRootProvider,
	useCreateComponent,
	useTestRouter,
	useTestScope
} from '~/tests';


describe('features/tasks/form/form', () => {
	const roomId = 1;
	const form = createForm();
	const buttonText = 'submit';
	const titleT = 'form title';

	const { Provider: ScopeProvider, getScope, } = useTestScope();
	const { Provider: RouterProvider, } = useTestRouter({ getScope, router, });
	const RootProvider = createRootProvider(ScopeProvider, RouterProvider);
	const { getWrapper, create, } = useCreateComponent({
		Component: TaskForm,
		defaultProps: {
			$form: form,
			buttonText,
			titleT,
		},
		options: {
			wrapper: RootProvider,
		},
	});

	const findForm = () => getWrapper().getByRole('form', { name: titleT, });
	const findTitleField = () =>
		getWrapper().getByRole('textbox', {
			name: 'actions.task_form.fields.title',
		});
	const findTagsSelect = () =>
		getWrapper().getByRole('combobox', {
			name: 'actions.task_form.fields.tags',
		});
	const findButton = () =>
		getWrapper().getByRole('button', { name: buttonText, });

	beforeEach(async () => {
		await allSettled(tagsModel.query.start, {
			scope: getScope(),
			params: {
				roomId,
			},
		});
	});

	test('should render form with 4 fields and button', async () => {
		create();

		expect(findForm()).toMatchSnapshot('with button');
	});

	test('should hide button if passed hideButton=true', async () => {
		create({
			hideButton: true,
		});

		expect(findForm()).toMatchSnapshot('without button');
	});

	test('should submit form on button click', async () => {
		expect.assertions(1);

		const cb = vi.fn();
		const unwatch = form.formValidated.watch(cb);

		create();

		debug(form.fields.tagIds.$errors);

		const titleField = findTitleField();
		fireEvent.input(titleField, { target: { value: 'Some target', }, });

		const tagsSelect = findTagsSelect();
		fireEvent.click(tagsSelect);
		fireEvent.input(tagsSelect, { target: { value: 'A tag', }, });
		fireEvent.click(screen.getByRole('option'));

		const button = findButton();

		fireEvent.click(button);

		expect(cb).toHaveBeenCalled();

		unwatch();
	});

	describe('validation', () => {
		describe('title', () => {
			test('empty', async () => {
				create();

				const titleField = findTitleField();

				fireEvent.input(titleField, { target: { value: '', }, });

				const button = findButton();

				fireEvent.click(button);

				await waitFor(() => {
					expect(getWrapper().getByText("Title can't be empty"));
				});
			});

			test('too long', async () => {
				create();

				const titleField = findTitleField();

				fireEvent.input(titleField, {
					target: { value: Array(129).fill('a'), },
				});

				const button = findButton();

				fireEvent.click(button);

				await waitFor(() => {
					expect(getWrapper().getByText('Title can be less than 128'));
				});
			});
		});

		describe('tags', () => {
			test('empty', async () => {
				create();

				const button = findButton();

				fireEvent.click(button);

				await waitFor(() => {
					expect(getWrapper().getByText('At least one tag must be chosen'));
				});
			});
		});
	});
});
