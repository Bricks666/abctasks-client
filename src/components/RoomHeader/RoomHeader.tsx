import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Block } from "@/ui/Block";
import { Text } from "@/ui/Text";
import { usePrepareLink } from "@/hooks";
import { GET_PARAMS, POPUPS } from "@/const";
import { EditMenu } from "../EditMenu";
import { MenuOption } from "@/ui/Menu";

import RoomHeaderStyle from "./RoomHeader.module.css";

interface RoomHeaderProps extends ClassNameProps {
	readonly header: string;
}

export const RoomHeader: FC<RoomHeaderProps> = ({ header, className }) => {
	const groupsLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.groups,
		},
	});
	const options: MenuOption[] = [
		{
			label: "Groups",
			to: groupsLink,
		},
	];
	return (
		<Block className={classNames(RoomHeaderStyle.block, className)}>
			<Text className={RoomHeaderStyle.header} component="h2">
				{header}
			</Text>
			<EditMenu options={options} />
		</Block>
	);
};
