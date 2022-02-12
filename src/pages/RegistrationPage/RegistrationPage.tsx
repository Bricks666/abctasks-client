import React, { FC } from "react";
import { RegistrationForm } from "../../components/RegistrationForm";
import { SaveLink } from "../../components/SaveLink";
import { ClassNameProps } from "../../interfaces/common";
import { ContentLayout } from "../../ui/ContentLayout";
import { Text } from "../../ui/Text";

import RegistrationPageStyle from "./RegistrationPage.module.css";

export const RegistrationPage: FC<ClassNameProps> = ({ className }) => {
	return (
		<main className={className}>
			<ContentLayout className={RegistrationPageStyle.layout}>
				<Text className={RegistrationPageStyle.header} component="h2">
					Registration
				</Text>
				<RegistrationForm className={RegistrationPageStyle.form} />
				<SaveLink className={RegistrationPageStyle.link} to="/login">
					Login
				</SaveLink>
			</ContentLayout>
		</main>
	);
};
