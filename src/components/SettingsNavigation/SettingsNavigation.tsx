import { ROUTES } from "@/const";
import { i18n } from "@/i18n";
import { ClassNameProps } from "@/interfaces/common";
import { Block } from "@/ui/Block";
import { List } from "@/ui/List";
import { ListItem } from "@/ui/ListItem";
import { ListItemButton } from "@/ui/ListItemButton";
import React, { FC } from "react";

const navigation = [
	{
		label: i18n.t("navigation.generic", { ns: "settings" }),
		to: ROUTES.SETTINGS_GENERIC,
	},
	{
		label: i18n.t("navigation.profile", { ns: "settings" }),
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
