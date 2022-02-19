import { ClassNameProps, ExtractProps } from "@/interfaces/common";
import React, { FC, MouseEventHandler } from "react";
import { Path } from "react-router-dom";
import { List } from "../List";
import { ListItem } from "../ListItem";
import { ListItemButton } from "../ListItemButton";
import { Popover } from "../Popover";
import { Text } from "../Text";

import MenuStyle from "./Menu.module.css";

export type MenuOption = {
	readonly label: string;
	readonly onClick?: MouseEventHandler;
	readonly to?: Path;
	readonly icon?: JSX.Element;
};
/* TODO: Добавить разделитель */
/* | "divisor"; */

interface MenuProps extends ClassNameProps, ExtractProps<typeof Popover> {
	readonly options: MenuOption[];
}

export const Menu: FC<MenuProps> = ({ options, className, ...props }) => {
	return (
		<Popover {...props}>
			<List className={className}>
				{options.map(({ label, icon, ...button }) => (
					<ListItem className={MenuStyle.item} key={label}>
						<ListItemButton {...button}>
							{icon}
							<Text component="span">{label}</Text>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Popover>
	);
};
