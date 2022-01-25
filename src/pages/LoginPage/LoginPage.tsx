import React, { FC } from "react";
import { LoginForm } from "../../components/LoginForm";
import { SaveLink } from "../../components/SaveLink";
import { ClassNameComponent } from "../../interfaces/common";
import { ContentLayout } from "../../ui/ContentLayout";
import { SectionHeader } from "../../ui/SectionHeader";

import LoginPageStyle from "./LoginPage.module.css";

export const LoginPage: FC<ClassNameComponent> = ({ className }) => {
	return (
		<main className={className}>
			<ContentLayout className={LoginPageStyle.layout}>
				<SectionHeader className={LoginPageStyle.header}>Login</SectionHeader>
				<LoginForm className={LoginPageStyle.form} />
				<SaveLink className={LoginPageStyle.link} to="/registration">
					Registration
				</SaveLink>
			</ContentLayout>
		</main>
	);
};
