import React, { FC } from "react";
import { Block } from "@/ui/Block";
import { Text } from "@/ui/Text";
import { ClassNameProps } from "@/interfaces/common";
import { UpdateProfileForm } from "./UpdateProfileForm";
import { useProfileLoading } from "@/hooks";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { LoadingIndicator } from "@/components/LoadingIndicator";

export const UpdateProfile: FC<ClassNameProps> = ({ className }) => {
	const isLoading = useProfileLoading();
	return (
		<LoadingWrapper
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator />}
		>
			<Block className={className}>
				<Text component="h3">Profile</Text>
				<UpdateProfileForm />
			</Block>
		</LoadingWrapper>
	);
};
