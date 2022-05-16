import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { RegistrationForm } from "@/components/RegistrationForm";
import { SaveLink } from "@/components/SaveLink";
import { ClassNameProps } from "@/interfaces/common";
import { ContentLayout } from "@/ui/ContentLayout";
import { usePageTitle } from "@/hooks";
import { Typography } from "@mui/material";

import RegistrationPageStyle from "./RegistrationPage.module.css";

export const RegistrationPage: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("registration");
	usePageTitle(t("title"));
	return (
		<main className={className}>
			<ContentLayout className={RegistrationPageStyle.layout}>
				<Typography
					className={RegistrationPageStyle.header}
					component="h2"
					variant="h3"
					align="center"
				>
					{t("title")}
				</Typography>
				<RegistrationForm className={RegistrationPageStyle.form} />
				<SaveLink className={RegistrationPageStyle.link} to="/login">
					{t("links.login")}
				</SaveLink>
			</ContentLayout>
		</main>
	);
};
