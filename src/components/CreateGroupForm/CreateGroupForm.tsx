import React, { CSSProperties, FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { CreateGroupRequest } from "@/interfaces/requests";
import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import { useForm } from "react-hook-form";
import { TextField } from "../TextField";
import { createGroup } from "@/models/Groups";

export const CreateGroupForm: FC<ClassNameProps> = ({ className }) => {
	const { control, watch, formState, handleSubmit } =
		useForm<CreateGroupRequest>({
			defaultValues: {
				mainColor: "#000000",
				name: "",
				secondColor: "#FFFFFF",
			},
		});

	const { isDirty } = formState;
	const state = watch();
	const groupStyle: CSSProperties = {
		backgroundColor: state.secondColor,
		color: state.mainColor,
	};

	const onSubmit = (values: CreateGroupRequest) => {
		createGroup(values);
	};

	return (
		<section className={className}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField name="name" control={control} type="text" />
				<TextField name="mainColor" control={control} type="color" />
				<TextField name="secondColor" control={control} type="color" />
				<Button disabled={!isDirty}>Add group</Button>
			</form>
			<Text component="span" cssStyles={groupStyle}>
				{state.name}
			</Text>
		</section>
	);
};
