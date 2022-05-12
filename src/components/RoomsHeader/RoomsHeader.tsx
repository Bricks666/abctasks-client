import React, { FC, useMemo } from "react";
import { Block } from "@/ui/Block";
import { Text } from "@/ui/Text";
import { EditMenu } from "../EditMenu";
import { ClassNameProps } from "@/interfaces/common";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { MenuOption } from "@/ui/MenuItem";
import { usePrepareLink } from "@/hooks";
import { GET_PARAMS, POPUPS } from "@/const";

import RoomsHeaderStyle from "./RoomsHeader.module.css";

export const RoomsHeader: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("rooms");
	const createLink = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.createRoom,
		},
	});
	const options = useMemo<MenuOption[]>(
		() => [
			{
				label: "Create room",
				to: createLink,
			},
		],
		[createLink]
	);
	return (
		<Block className={classNames(RoomsHeaderStyle.header, className)}>
			<Text component="h2">{t("title")}</Text>
			<EditMenu options={options} />
		</Block>
	);
};
