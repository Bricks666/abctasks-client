import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { RoomList } from "@/components/RoomList";
import { usePageTitle } from "@/hooks";
import { ContentLayout } from "@/ui/ContentLayout";
import { Text } from "@/ui/Text";

export const RoomsPage: FC = () => {
	const { t } = useTranslation("rooms");
	usePageTitle(t("title"));
	return (
		<main>
			<ContentLayout>
				<Text>{t("title")}</Text>
				<RoomList />
			</ContentLayout>
		</main>
	);
};
