import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { Size } from '@/interfaces/ui';
import { DotsIcon } from '@/ui/DotsIcon';
import { IconButton } from '@/ui/IconButton';
import { Menu } from '@/ui/Menu';
import { MenuItem, MenuOption } from '@/ui/MenuItem';
import { useAnyPopupOpen, useToggle } from '@/hooks';

import styles from './EditMenu.module.css';

export interface EditMenuComponent extends CommonProps {
	readonly alt?: string;
	readonly options: MenuOption[];
	readonly size?: Size;
}

export const EditMenu: React.FC<EditMenuComponent> = ({
	options,
	className,
	size,
	alt,
}) => {
	const [isOpen, toggle] = useToggle();
	const [reference, setReference] = React.useState<HTMLElement | null>(null);
	const anyPopupOpen = useAnyPopupOpen();
	return (
		<div className={className}>
			<div className={styles.container} ref={setReference}>
				<IconButton onClick={toggle} size={size} tabIndex={0} title={alt}>
					<DotsIcon />
				</IconButton>
			</div>
			<Menu
				reference={reference}
				isOpen={isOpen}
				onClose={toggle}
				placement='bottom-end'
				isFocus={!anyPopupOpen}>
				{options.map((option) => (
					<MenuItem {...option} key={option.label} />
				))}
			</Menu>
		</div>
	);
};
