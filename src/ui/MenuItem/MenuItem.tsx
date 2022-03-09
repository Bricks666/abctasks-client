import { ClassNameProps } from "@/interfaces/common";
import React, {
	AriaAttributes,
	AriaRole,
	CSSProperties,
	FC,
	MouseEventHandler,
} from "react";
import { Path } from "react-router-dom";
import { ListItem } from "../ListItem";
import { ListItemButton } from "../ListItemButton";
import { Text } from "../Text";

import MenuItemStyle from "./MenuItem.module.css";

export type MenuOption = {
	readonly label: string;
	readonly onClick?: MouseEventHandler;
	readonly to?: Path;
	readonly icon?: JSX.Element;
};

interface MenuItemProps extends ClassNameProps, MenuOption, AriaAttributes {
	readonly style?: CSSProperties;
	readonly role?: AriaRole;
}

export const MenuItem: FC<MenuItemProps> = ({
	label,
	icon,
	onClick,
	to,
	role = "menuitem",
	...props
}) => {
	return (
		<ListItem className={MenuItemStyle.item} role={role} {...props}>
			<ListItemButton onClick={onClick} to={to} tabIndex={0}>
				{icon}
				<Text component="span">{label}</Text>
			</ListItemButton>
		</ListItem>
	);
};
