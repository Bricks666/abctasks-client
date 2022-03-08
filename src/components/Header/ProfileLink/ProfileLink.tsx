import React, { FC, useCallback, useState } from "react";
import { useUserInfo } from "@/hooks";
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
	const [isOpen, setIsOpen] = useState(false);
	const [reference, setReference] = useState<HTMLElement | null>(null);

	const close = useCallback(() => setIsOpen(false), []);
	const open = useCallback(() => setIsOpen(true), []);

	const handler = isOpen ? close : open;

	return (
		<div className={className} ref={setReference}>
			<Avatar
				src={photo}
				alt={login}
				ref={setReference}
				onClick={handler}
				onKeyDown={handler}
				tabIndex={0}
				aria-haspopup="menu"
				role="button"
			>
				{login[0]?.toUpperCase()}
			</Avatar>
			<Menu
				reference={reference}
				isOpen={isOpen}
				onClose={close}
				placement="bottom-end"
			>
				{options.map((option) => (
					<MenuItem {...option} key={option.label} />
				))}
			</Menu>
		</div>
	);
};
