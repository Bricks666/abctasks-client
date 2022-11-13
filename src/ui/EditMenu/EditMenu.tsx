import * as React from 'react';
import { IconButton, Menu } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useToggle } from '@/hooks';
import { CommonProps, Size } from '@/types';
import { MenuOption, MenuItem } from '@/ui/MenuItem';

export interface EditMenuProps extends CommonProps {
	readonly alt?: string;
	readonly options: MenuOption<object>[];
	readonly size?: Size;
}

export const EditMenu: React.FC<EditMenuProps> = React.memo((props) => {
	const { options, className, size, alt } = props;
	const [isOpen, toggle] = useToggle();
	const [reference, setReference] = React.useState<HTMLElement | null>(null);
	return (
		<div className={className}>
			<IconButton
				onClick={toggle}
				size={size}
				tabIndex={0}
				title={alt}
				ref={setReference}>
				<MoreHorizIcon />
			</IconButton>
			<Menu anchorEl={reference} open={isOpen} onClose={toggle}>
				{options.map((option) => (
					<MenuItem {...option} key={option.label} />
				))}
			</Menu>
		</div>
	);
});
