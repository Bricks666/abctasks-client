import * as React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { CommonProps, VoidFunction } from '@/types/common';
import { TextField } from '../TextField';
import { Button } from '@/ui/Button';
import { validatingScheme } from './validator';
import { CreateUpdateRoomRequest, UpdateRoomRequest } from '@/models/rooms';

export interface RoomFormProps extends CommonProps {
	readonly submitHandler: (values: CreateUpdateRoomRequest) => unknown;
	readonly buttonText: string;
	readonly defaultState?: CreateUpdateRoomRequest;
	readonly afterSubmit?: VoidFunction;
}

const createInitialState = (): UpdateRoomRequest => {
	return {
		id: 0,
		name: '',
		description: '',
	};
};

export const RoomForm: React.FC<RoomFormProps> = ({
	afterSubmit,
	submitHandler,
	className,
	defaultState,
	buttonText,
}) => {
	const { register, formState, handleSubmit } = useForm({
		defaultValues: defaultState || createInitialState(),
		resolver: joiResolver(validatingScheme),
	});
	const { errors, isDirty, isSubmitting } = formState;
	const { description: roomDescription, name: roomName } = errors;
	const disabled = !isDirty || isSubmitting;
	const onSubmit = React.useCallback(
		async (values: CreateUpdateRoomRequest) => {
			await submitHandler(values);
			if (afterSubmit) {
				afterSubmit();
			}
		},
		[submitHandler, afterSubmit]
	);
	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<TextField
				{...register('name')}
				error={roomName?.message}
				label='Room name'
			/>
			<TextField
				{...register('description')}
				error={roomDescription?.message}
				label='Room description'
			/>
			<Button disabled={disabled}>{buttonText}</Button>
		</form>
	);
};
