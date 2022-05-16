import classNames from "classnames";
import { useParams } from "react-router-dom";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { ClassNameProps } from "@/interfaces/common";
import { usePrepareLink } from "@/hooks";
import { GET_PARAMS, POPUPS } from "@/const";
import { EditMenu } from "../EditMenu";
import { MenuOption } from "@/ui/MenuItemList";
import { useRoom } from "./hooks";
import { Box, Typography } from "@mui/material";

import RoomHeaderStyle from "./RoomHeader.module.css";

export const RoomHeader: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("room");
	const groupsLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.groups,
		},
	});
	const options: MenuOption[] = [
		{
			label: t("menus.groups"),
			to: groupsLink,
		},
	];
	const { id: roomId } = useParams();
	const room = useRoom(roomId);
	return (
		<Box className={classNames(RoomHeaderStyle.block, className)}>
			<Typography sx={{ marginRight: "auto" }} component="h2" variant="h3">
				{room?.name}
			</Typography>
			<EditMenu options={options} alt="Open room edit menu" />
		</Box>
	);
};
