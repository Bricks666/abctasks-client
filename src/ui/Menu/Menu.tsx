import * as React from 'react';
import { CommonProps, ExtractProps } from '@/interfaces/common';
import { List } from '../List';
import { Popover } from '../Popover';

export interface MenuProps
	extends CommonProps,
		ExtractProps<typeof Popover, 'className'> {
	readonly role?: React.AriaRole;
	readonly style?: React.CSSProperties;
}

export const Menu: React.FC<MenuProps> = ({
	children,
	className,
	role = 'menu',
	...props
}) => {
	return (
		<Popover {...props} role={role}>
			<List className={className}>{children}</List>
		</Popover>
	);
};
