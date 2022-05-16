import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { LoginForm } from "@/components/LoginForm";
import { SaveLink } from "@/components/SaveLink";
import { ClassNameProps } from "@/interfaces/common";
import { ContentLayout } from "@/ui/ContentLayout";
import { usePageTitle } from "@/hooks";
import { Box, Typography } from "@mui/material";

import LoginPageStyle from "./LoginPage.module.css";

export const LoginPage: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("login");
	usePageTitle(t("title"));
	return (
		<Box className={className}>
			<ContentLayout className={LoginPageStyle.layout}>
				<Typography
					className={LoginPageStyle.header}
					variant="h3"
					component="h2"
					align="center"
				>
					{t("title")}
				</Typography>
				<LoginForm className={LoginPageStyle.form} />
				<SaveLink className={LoginPageStyle.link} to="/registration">
					{t("links.registration")}
				</SaveLink>
			</ContentLayout>
		</Box>
	);
};
