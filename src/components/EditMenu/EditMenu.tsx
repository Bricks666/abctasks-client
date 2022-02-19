import React, { FC, useState, useCallback } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Size } from "@/interfaces/ui";
import { DotsIcon } from "@/ui/DotsIcon";
import { IconButton } from "@/ui/IconButton";
import { Menu, MenuOption } from "@/ui/Menu";

import EditMenuStyle from "./EditMenu.module.css";

interface EditMenuComponent extends ClassNameProps {
	readonly options: MenuOption[];
	readonly size?: Size;
}

export const EditMenu: FC<EditMenuComponent> = ({
	options,
	className,
	size,
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
				>
					<DotsIcon />
				</IconButton>
			</div>
			<Menu
				reference={reference}
				isOpen={isOpen}
				onClose={onClose}
				options={options}
				placement="bottom-end"
			/>
		</div>
	);
};
