import { Tooltip, IconButton, Popover } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { deviceInfoModel } from '@/shared/models';
import { CommonProps, VoidFunction } from '@/shared/types';

import { FullWidthPopup, FullWidthPopupProps } from '../full-width-popup';

interface RenderProps {
	readonly isPopup: boolean;
}

export interface FiltersPopoverProps extends CommonProps {
	readonly open: boolean;
	readonly children: React.ComponentType<RenderProps>;
	readonly onOpen: VoidFunction;
	readonly onClose: VoidFunction;
	readonly title: string;
	readonly icon: React.ReactElement;
	readonly slots?: FullWidthPopupProps['slots'];
}

export const FiltersPopover: React.FC<FiltersPopoverProps> = (props) => {
	const { title, open, onClose, onOpen, icon, children, className, slots, } =
		props;

	const [ref, setRef] = React.useState<HTMLElement | null>(null);

	const [isMobile, isVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);

	const isPopup = isMobile || isVertical;

	const child = React.createElement(children, { isPopup, });

	let content: React.ReactElement;

	if (isPopup) {
		content = (
			<FullWidthPopup
				isOpen={open}
				onClose={onClose}
				title={title}
				slots={slots}>
				{child}
			</FullWidthPopup>
		);
	} else {
		content = (
			<Popover
				open={open}
				onClose={onClose}
				anchorEl={ref}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'bottom',
				}}
				transformOrigin={{
					horizontal: 'right',
					vertical: 'top',
				}}>
				{child}
			</Popover>
		);
	}

	return (
		<>
			<Tooltip title={title}>
				<IconButton
					className={className}
					onClick={open ? onClose : onOpen}
					ref={setRef}>
					{icon}
				</IconButton>
			</Tooltip>
			{content}
		</>
	);
};
