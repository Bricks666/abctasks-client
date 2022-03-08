import React, { FC, useState, useCallback } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Size } from "@/interfaces/ui";
import { DotsIcon } from "@/ui/DotsIcon";
import { IconButton } from "@/ui/IconButton";
import { Menu } from "@/ui/Menu";
import { MenuItem, MenuOption } from "@/ui/MenuItem";

import EditMenuStyle from "./EditMenu.module.css";
import { useToggle } from "@/hooks";

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
					<DotsIcon />
				</IconButton>
			</div>
			<Menu
				reference={reference}
				isOpen={isOpen}
				onClose={toggle}
				placement="bottom-end"
			>
				{options.map((option) => (
					<MenuItem {...option} key={option.label} />
				))}
			</Menu>
		</div>
	);
};
