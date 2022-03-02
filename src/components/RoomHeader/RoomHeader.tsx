import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Block } from "@/ui/Block";
import { Text } from "@/ui/Text";
import { Button } from "@/ui/Button";
import { usePrepareLink } from "@/hooks";
import { GET_PARAMS, POPUPS } from "@/const";

import RoomHeaderStyle from "./RoomHeader.module.css";

interface RoomHeaderProps extends ClassNameProps {
	readonly header: string;
}

export const RoomHeader: FC<RoomHeaderProps> = ({ header, className }) => {
	const addGroupLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.groups,
		},
	});
	return (
		<Block className={classNames(RoomHeaderStyle.block, className)}>
			<Text className={RoomHeaderStyle.header} component="h2">
				{header}
			</Text>
			<Button type="text" size="small" color="dark" to={addGroupLink}>
				Groups
			</Button>
		</Block>
	);
};
