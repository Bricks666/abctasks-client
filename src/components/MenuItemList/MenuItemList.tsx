import { ClassNameProps } from "@/interfaces/common";
import { MenuItem, MenuList } from "@mui/material";
import React, { FC, MouseEventHandler } from "react";
import { Path, Link } from "react-router-dom";

export type MenuOption = {
	readonly label: string;
	readonly onClick?: MouseEventHandler;
	readonly to?: Path | string;
};

interface MenuItemListProps extends ClassNameProps {
	readonly options: MenuOption[];
}

export const MenuItemList: FC<MenuItemListProps> = ({ className, options }) => {
	return (
		<MenuList className={className}>
			{options.map(({ label, onClick, to }) =>
				to ? (
					<MenuItem component={Link} to={to} key={label}>
						{label}
					</MenuItem>
				) : (
					<MenuItem onClick={onClick} key={label}>
						{label}
					</MenuItem>
				)
			)}
		</MenuList>
	);
};
