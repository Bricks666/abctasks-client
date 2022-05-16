import React, { FC, useState } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Size } from "@/interfaces/ui";
import { useToggle } from "@/hooks";
import { MenuItemList, MenuOption } from "@/ui/MenuItemList";
import { IconButton, Menu } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";

import EditMenuStyle from "./EditMenu.module.css";

interface EditMenuComponent extends ClassNameProps {
	readonly alt?: string;
	readonly options: MenuOption[];
	readonly size?: Size;
}

export const EditMenu: FC<EditMenuComponent> = ({
	options,
	className,
	size,
	alt,
}) => {
	const [isOpen, toggle] = useToggle();
	const [reference, setReference] = useState<HTMLElement | null>(null);
	return (
		<div className={className}>
			<div className={EditMenuStyle.container} ref={setReference}>
				<IconButton
					className={EditMenuStyle.button}
					onClick={toggle}
					size={size}
					tabIndex={0}
					title={alt}
				>
					<MoreHoriz />
				</IconButton>
			</div>
			<Menu anchorEl={reference} open={isOpen} onClose={toggle}>
				<MenuItemList options={options} />
			</Menu>
		</div>
	);
};
