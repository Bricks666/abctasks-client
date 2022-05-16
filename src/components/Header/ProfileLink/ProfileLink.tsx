import React, { FC, useState } from "react";
import { useToggle, useUserInfo } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { logout } from "@/models/Auth";
import { ROUTES } from "@/const";
import { Avatar, Menu } from "@mui/material";
import { MenuItemList, MenuOption } from "@/components/MenuItemList";

const options: MenuOption[] = [
	{
		label: "Settings",
		to: ROUTES.SETTINGS.slice(0, -2),
	},
	{
		label: "Logout",
		onClick: () => logout(),
	},
];

export const ProfileLink: FC<ClassNameProps> = ({ className }) => {
	const { login, photo } = useUserInfo();
	const [isOpen, toggle] = useToggle(false);
	const [reference, setReference] = useState<HTMLElement | null>(null);
	const shortName = login[0]?.toUpperCase();
	return (
		<div className={className}>
			<Avatar
				src={photo || ""}
				alt={shortName}
				ref={setReference}
				onClick={toggle}
				tabIndex={0}
				aria-haspopup="menu"
				role="button"
			/>
			<Menu anchorEl={reference} open={isOpen} onClose={toggle}>
				<MenuItemList options={options} />
			</Menu>
		</div>
	);
};
