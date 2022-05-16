import React, { FC, useMemo } from "react";
import { EditMenu } from "../EditMenu";
import { ClassNameProps } from "@/interfaces/common";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { MenuOption } from "@/ui/MenuItemList";
import { usePrepareLink } from "@/hooks";
import { GET_PARAMS, POPUPS } from "@/const";
import { Box, Typography } from "@mui/material";

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
		<Box
			className={classNames(RoomsHeaderStyle.header, className)}
			component="header"
		>
			<Typography component="h2" variant="h3">{t("title")}</Typography>
			<EditMenu options={options} />
		</Box>
	);
};
