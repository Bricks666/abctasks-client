import React, { FC } from "react";
import { LoginForm } from "@/components/LoginForm";
import { SaveLink } from "@/components/SaveLink";
import { ClassNameProps } from "@/interfaces/common";
import { ContentLayout } from "@/ui/ContentLayout";
import { Text } from "@/ui/Text";

import LoginPageStyle from "./LoginPage.module.css";

export const LoginPage: FC<ClassNameProps> = ({ className }) => {
	return (
		<main className={className}>
			<ContentLayout className={LoginPageStyle.layout}>
				<Text className={LoginPageStyle.header} component="h2">
					Login
				</Text>
				<LoginForm className={LoginPageStyle.form} />
				<SaveLink className={LoginPageStyle.link} to="/registration">
					Registration
				</SaveLink>
			</ContentLayout>
		</main>
	);
};
