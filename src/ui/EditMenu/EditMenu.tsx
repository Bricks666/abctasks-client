import React, { FC, MouseEventHandler, useState, useCallback } from "react";
import { To } from "react-router-dom";
import { ClassNameProps } from "@/interfaces/common";
import { Size } from "@/interfaces/ui";
import { DotsIcon } from "../DotsIcon";
import { IconButton } from "../IconButton";
import { List } from "../List";
import { ListItem } from "../ListItem";
import { ListItemButton } from "../ListItemButton";
import { Popover } from "../Popover";
import { Text } from "../Text";

import EditMenuStyle from "./EditMenu.module.css";

interface EditMenuContent {
	readonly label: string;
	readonly onClick?: MouseEventHandler<HTMLButtonElement>;
	readonly to?: To;
	readonly disabled?: boolean;
}

interface EditMenuComponent extends ClassNameProps {
	readonly content: EditMenuContent[];
	readonly size?: Size;
}

export const EditMenu: FC<EditMenuComponent> = ({
	content,
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
			<Popover
				reference={reference}
				isOpen={isOpen}
				onClose={onClose}
				placement="bottom-end"
			>
				<List className={EditMenuStyle.list}>
					{content.map(({ label, ...button }, i) => {
						return (
							<ListItem key={i}>
								<ListItemButton {...button}>
									<Text component="span">{label}</Text>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Popover>
		</div>
	);
};
