import { ROUTES } from "@/const";
import { ClassNameProps } from "@/interfaces/common";
import { Block } from "@/ui/Block";
import { List } from "@/ui/List";
import { ListItem } from "@/ui/ListItem";
import { ListItemButton } from "@/ui/ListItemButton";
import React, { FC } from "react";

const navigation = [
	{
		label: "Profile",
		to: ROUTES.SETTINGS_PROFILE,
	},
];

export const SettingsNavigation: FC<ClassNameProps> = ({ className }) => {
	return (
		<Block className={className}>
			<List>
				{navigation.map(({ label, ...props }) => (
					<ListItem key={label}>
						<ListItemButton {...props}>{label}</ListItemButton>
					</ListItem>
				))}
			</List>
		</Block>
	);
};
