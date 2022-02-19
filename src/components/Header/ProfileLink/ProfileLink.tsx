import React, { FC, useCallback, useState } from "react";
import { useUserInfo } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { Avatar } from "@/ui/Avatar";
import { logout } from "@/models/User";
import { Menu, MenuOption } from "@/ui/Menu";

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

	return (
		<div className={className} ref={setReference}>
			<Avatar
				src={photo}
				alt={login}
				ref={setReference}
				onClick={isOpen ? close : open}
			/>
			<Menu
				reference={reference}
				options={options}
				isOpen={isOpen}
				onClose={close}
				placement="bottom-end"
			/>
		</div>
	);
};
