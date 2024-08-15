import { beforeEach, describe, expect, test, vi } from 'vitest';

import { tagsModel } from '@/entities/tags';

import { router } from '@/shared/configs';

import { TaskForm } from './form';
import { create as createForm } from './model';

import {
	RenderResult,
	Scope,
	act,
	allSettled,
	fireEvent,
	fork,
	render,
	screen,
	useTestRouter,
	waitFor
} from '~/test-utils';

describe('features/tasks/form/form', () => {
	const roomId = 1;
	const form = createForm();
	const buttonText = 'submit';
	const titleT = 'form title';
	let scope: Scope;
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(
			<TaskForm $form={form} buttonText={buttonText} titleT={titleT} />,
			{ scope, router, }
		);
	};

	const findForm = () => wrapper.getByRole('form', { name: titleT, });
	const findTitleField = () =>
		wrapper.getByRole('textbox', {
			name: 'actions.task_form.fields.title',
		});
	const findTagsSelect = () =>
		wrapper.getByRole('combobox', {
			name: 'actions.task_form.fields.tags',
		});
	const findButton = () => wrapper.getByRole('button', { name: buttonText, });

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
		await allSettled(tagsModel.query.start, {
			scope,
			params: {
				roomId,
			},
		});

		await act(async () => createComponent());
	});

	test('should render form with 4 fields and button', async () => {
		expect(findForm()).toMatchSnapshot('with button');
	});

	test('should hide button if passed hideButton=true', async () => {
		await act(async () =>
			wrapper.rerender(
				<TaskForm
					$form={form}
					buttonText={buttonText}
					titleT={titleT}
					hideButton
				/>
			)
		);

		expect(findForm()).toMatchSnapshot('without button');
	});

	test('should submit form on button click', async () => {
		expect.assertions(1);

		const cb = vi.fn();
		const unwatch = form.formValidated.watch(cb);

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
				const titleField = findTitleField();

				fireEvent.input(titleField, { target: { value: '', }, });

				const button = findButton();

				fireEvent.click(button);

				await waitFor(() => {
					expect(wrapper.getByText("Title can't be empty"));
				});
			});

			test('too long', async () => {
				const titleField = findTitleField();

				fireEvent.input(titleField, {
					target: { value: Array(129).fill('a'), },
				});

				const button = findButton();

				fireEvent.click(button);

				await waitFor(() => {
					expect(wrapper.getByText('Title can be less than 128'));
				});
			});
		});

		describe('tags', () => {
			test('empty', async () => {
				const button = findButton();

				fireEvent.click(button);

				await waitFor(() => {
					expect(wrapper.getByText('At least one tag must be chosen'));
				});
			});
		});
	});
});
