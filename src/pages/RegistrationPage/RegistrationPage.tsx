import React, { FC } from "react";
import { RegistrationForm } from "../../components/RegistrationForm";
import { SaveLink } from "../../components/SaveLink";
import { ContentLayout } from "../../ui/ContentLayout";
import { SectionHeader } from "../../ui/SectionHeader";

export const RegistrationPage: FC = () => {
	return (
		<ContentLayout>
			<SectionHeader>Registration</SectionHeader>
			<RegistrationForm />
			<SaveLink to="/login">Login</SaveLink>
		</ContentLayout>
	);
};
