import React, { FC, useState, useCallback } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Size } from "@/interfaces/ui";
import { DotsIcon } from "@/ui/DotsIcon";
import { IconButton } from "@/ui/IconButton";
import { Menu } from "@/ui/Menu";
import { MenuItem, MenuOption } from "@/ui/MenuItem";

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
	const [isOpen, setIsOpen] = useState(false);
	const [reference, setReference] = useState<HTMLElement | null>(null);

	const onClose = useCallback(() => {
		setIsOpen(false);
	}, []);
	const onOpen = useCallback(() => {
		setIsOpen(true);
	}, []);

	return (
		<div className={className}>
			<div className={EditMenuStyle.container} ref={setReference}>
				<IconButton
					className={EditMenuStyle.button}
					onClick={isOpen ? onClose : onOpen}
					size={size}
					tabIndex={0}
					title={alt}
				>
					<DotsIcon />
				</IconButton>
			</div>
			<Menu
				reference={reference}
				isOpen={isOpen}
				onClose={onClose}
				placement="bottom-end"
			>
				{options.map((option) => (
					<MenuItem {...option} key={option.label} />
				))}
			</Menu>
		</div>
	);
};
