import React, { FC } from "react";
import { RegistrationForm } from "../../components/RegistrationForm";
import { SaveLink } from "../../components/SaveLink";
import { ClassNameComponent } from "../../interfaces/common";
import { ContentLayout } from "../../ui/ContentLayout";
import { SectionHeader } from "../../ui/SectionHeader";

import RegistrationPageStyle from "./RegistrationPage.module.css";

export const RegistrationPage: FC<ClassNameComponent> = ({ className }) => {
	return (
		<main className={className}>
			<ContentLayout className={RegistrationPageStyle.layout}>
				<SectionHeader className={RegistrationPageStyle.header}>
					Registration
				</SectionHeader>
				<RegistrationForm className={RegistrationPageStyle.form} />
				<SaveLink className={RegistrationPageStyle.link} to="/login">
					Login
				</SaveLink>
			</ContentLayout>
		</main>
	);
};
