import * as React from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { useClickOutside } from '@/hooks';
import { Portal } from '../Portal';
import { Block } from '../Block';
import { FocusTrap } from '../FocusTrap';
import { useKeyListener } from '../hooks';

import PopoverStyle from './Popover.module.css';

export interface PopoverProps
	extends React.AriaAttributes,
		React.HTMLAttributes<HTMLDivElement> {
	readonly reference: HTMLElement | null;
	readonly isOpen: boolean;
	readonly onClose: (evt?: MouseEvent) => unknown;
	readonly placement?: Placement;
	readonly isFocus?: boolean;
	readonly closeOnEsc?: boolean;
}

export const Popover: React.FC<PopoverProps> = React.memo(function Popover({
	reference,
	isOpen,
	placement,
	onClose,
	children,
	style,
	isFocus = isOpen,
	closeOnEsc = true,
	...props
}) {
	const [popover, setPopover] = React.useState<HTMLElement | null>(null);
	const { styles, attributes } = usePopper(reference, popover, { placement });
	useClickOutside(popover, onClose, isOpen);
	useKeyListener('Escape', onClose, closeOnEsc && isOpen);

	return isOpen ? (
		<Portal>
			<div
				className={PopoverStyle.popover}
				style={{ ...styles.popper, ...style }}
				{...attributes}
				ref={setPopover}
				{...props}>
				<FocusTrap open={isFocus}>
					<Block className={PopoverStyle.block}>{children}</Block>
				</FocusTrap>
			</div>
		</Portal>
	) : null;
});
