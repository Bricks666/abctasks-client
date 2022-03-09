import { ClassNameProps, ExtractProps } from "@/interfaces/common";
import React, { AriaRole, CSSProperties, FC } from "react";
import { List } from "../List";
import { Popover } from "../Popover";

interface MenuProps
	extends ClassNameProps,
		ExtractProps<typeof Popover, "className"> {
	readonly role?: AriaRole;
	readonly style?: CSSProperties;
}

export const Menu: FC<MenuProps> = ({
	children,
	className,
	role = "menu",
	...props
}) => {
	return (
		<Popover {...props} role={role}>
			<List className={className}>{children}</List>
		</Popover>
	);
};
