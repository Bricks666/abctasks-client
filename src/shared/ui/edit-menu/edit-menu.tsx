import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, PopoverOrigin, PopoverPosition } from '@mui/material';
import { CommonProps } from '@mui/material/OverridableComponent';
import * as React from 'react';

import { useToggle } from '@/shared/lib';
import { Size } from '@/shared/types';

import { Menu } from '../menu';

export interface EditMenuProps extends CommonProps, React.PropsWithChildren {
	readonly size?: Size;
	readonly anchorPosition?: PopoverPosition;
	readonly anchorOrigin?: PopoverOrigin;
	readonly transformOrigin?: PopoverOrigin;
}

export const EditMenu: React.FC<EditMenuProps> = React.memo((props) => {
	const {
		className,
		size,
		children,
		anchorOrigin,
		anchorPosition,
		transformOrigin,
	} = props;
	const [isOpen, { toggle, }] = useToggle();
	const [reference, setReference] = React.useState<HTMLElement | null>(null);

	const expanded = isOpen ? 'true' : undefined;

	return (
		<div className={className}>
			<IconButton
				onClick={toggle}
				size={size}
				tabIndex={0}
				aria-expanded={expanded}
				aria-haspopup='true'
				ref={setReference}>
				<MoreHorizIcon />
			</IconButton>
			<Menu
				anchorEl={reference}
				open={isOpen}
				onClose={toggle}
				anchorPosition={anchorPosition}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}>
				{children}
			</Menu>
		</div>
	);
});
