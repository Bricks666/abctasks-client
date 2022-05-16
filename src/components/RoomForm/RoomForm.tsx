import React, { FC, useCallback } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Field } from "../Field";
import { Button } from "@/ui/Button";
import { useForm } from "react-hook-form";
import { CreateEditRoomRequest, EditRoomRequest } from "@/interfaces/requests";
import { joiResolver } from "@hookform/resolvers/joi";
import { validatingScheme } from "./validator";

interface RoomFormProps extends ClassNameProps {
	readonly submitHandler: (values: CreateEditRoomRequest) => unknown;
	readonly buttonText: string;
	readonly defaultState?: CreateEditRoomRequest;
	readonly afterSubmit?: VoidFunction;
}

const createInitialState = (): EditRoomRequest => {
	return {
		roomId: 0,
		roomName: "",
		roomDescription: "",
	};
};

export const RoomForm: FC<RoomFormProps> = ({
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
	const { roomDescription, roomName } = errors;
	const disabled = !isDirty || isSubmitting;
	const onSubmit = useCallback(
		async (values: CreateEditRoomRequest) => {
			await submitHandler(values);
			afterSubmit && afterSubmit();
		},
		[submitHandler, afterSubmit]
	);
	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register("roomName")}
				error={!!roomName?.message}
				helperText={roomName?.message}
				label="Room name"
			/>
			<Field
				{...register("roomDescription")}
				error={!!roomDescription?.message}
				helperText={roomDescription?.message}
				label="Room description"
			/>
			<Button disabled={disabled}>{buttonText}</Button>
		</form>
	);
};
