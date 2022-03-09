import React, { FC, useState } from "react";
import { useAnyPopupOpen, useToggle, useUserInfo } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { Avatar } from "@/ui/Avatar";
import { logout } from "@/models/User";
import { Menu } from "@/ui/Menu";
import { MenuItem, MenuOption } from "@/ui/MenuItem";

const options: MenuOption[] = [
	{
		label: "Logout",
		onClick: () => logout(),
	},
];

export const ProfileLink: FC<ClassNameProps> = ({ className }) => {
	const { login, photo } = useUserInfo();
	const [isOpen, toggle] = useToggle(false);
	const [reference, setReference] = useState<HTMLElement | null>(null);
	const anyPopupOpen = useAnyPopupOpen();

	return (
		<div className={className} ref={setReference}>
			<Avatar
				src={photo}
				alt={login}
				ref={setReference}
				onClick={toggle}
				tabIndex={0}
				aria-haspopup="menu"
				role="button"
			>
				{login[0]?.toUpperCase()}
			</Avatar>
			<Menu
				reference={reference}
				isOpen={isOpen}
				onClose={toggle}
				placement="bottom-end"
				isFocus={!anyPopupOpen}
			>
				{options.map((option) => (
					<MenuItem {...option} key={option.label} />
				))}
			</Menu>
		</div>
	);
};
