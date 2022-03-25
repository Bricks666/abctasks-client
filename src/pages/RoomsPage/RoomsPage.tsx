import { usePageTitle } from "@/hooks";
import { ContentLayout } from "@/ui/ContentLayout";
import { Text } from "@/ui/Text";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

export const RoomsPage: FC = () => {
	const { t } = useTranslation("rooms");
	usePageTitle(t("title"));
	return (
		<main>
			<ContentLayout>
				<Text>{t("title")}</Text>
			</ContentLayout>
		</main>
	);
};
