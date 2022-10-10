import * as React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { TextField } from '@/components/TextField';
import { Button } from '@/ui/Button';
import { CreateEditGroupRequest } from '@/interfaces/requests';
import { Stack } from '@/ui/Stack';
import { validatingScheme } from './validator';
import { CommonProps, ID, VoidFunction } from '@/interfaces/common';
import { Group } from '@/ui/Group';

import GroupFormStyle from './GroupForm.module.css';

export interface GroupFormProps extends CommonProps {
	readonly defaultState?: CreateEditGroupRequest | null;
	readonly afterSubmit?: VoidFunction;
	readonly submitHandler: (values: CreateEditGroupRequest) => unknown;
	readonly buttonText: string;
}

const createInitialState = (roomId: ID): CreateEditGroupRequest => {
	return {
		id: 0,
		mainColor: '#000',
		secondColor: '#fff',
		name: '',
		roomId,
	};
};

export const GroupForm: React.FC<GroupFormProps> = ({
	afterSubmit,
	submitHandler,
	className,
	defaultState,
	buttonText,
}) => {
	const { id: roomId } = useParams();
	const { register, handleSubmit, watch, formState } =
		useForm<CreateEditGroupRequest>({
			defaultValues: defaultState || createInitialState(roomId!),
			resolver: joiResolver(validatingScheme),
		});
	const state = watch();
	const onSubmit = (values: CreateEditGroupRequest) => {
		submitHandler(values);
		// eslint-disable-next-line no-unused-expressions
		afterSubmit && afterSubmit();
	};
	const { t } = useTranslation('popups');
	const { isDirty, isSubmitting, errors } = formState;
	return (
		<form
			className={cn(GroupFormStyle.block, className)}
			onSubmit={handleSubmit(onSubmit)}>
			<Stack className={GroupFormStyle.fields}>
				<TextField
					className={GroupFormStyle.input}
					{...register('name')}
					label={t('group_form.name')}
					error={errors.name?.message}
				/>
				<TextField
					{...register('mainColor')}
					inputClassName={GroupFormStyle.color_input}
					label={t('group_form.main_color')}
					type='color'
					error={errors.mainColor?.message}
				/>
				<TextField
					{...register('secondColor')}
					inputClassName={GroupFormStyle.color_input}
					label={t('group_form.secondary_color')}
					type='color'
					error={errors.secondColor?.message}
				/>
			</Stack>
			{state.name && <Group {...state} />}

			<Button
				className={GroupFormStyle.button}
				disabled={!isDirty || isSubmitting}>
				{buttonText}
			</Button>
		</form>
	);
};
