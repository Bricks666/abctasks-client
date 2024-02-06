import { Tooltip, IconButton, Popover, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { deviceInfoModel } from '@/shared/models';
import { CommonProps, VoidFunction } from '@/shared/types';

import { FullWidthPopup, FullWidthPopupProps } from '../full-width-popup';

interface RenderProps {
	readonly isPopup: boolean;
	readonly titleId: string;
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
	const titleId = React.useId();
	const popupId = React.useId();

	const [isMobile, isVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);

	const isPopup = isMobile || isVertical;

	const child = React.createElement(children, { isPopup, titleId, });

	let content: React.ReactElement;

	if (isPopup) {
		content = (
			<FullWidthPopup
				id={popupId}
				isOpen={open}
				onClose={onClose}
				title={title}
				slots={slots}
				DialogTitleProps={{
					id: titleId,
				}}>
				{child}
			</FullWidthPopup>
		);
	} else {
		content = (
			<Popover
				id={popupId}
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
				<Typography id={titleId} className='visibility-hidden' component='p'>
					{title}
				</Typography>
				{child}
			</Popover>
		);
	}

	/**
	 * @todo
	 * Add aria-label for button
	 */

	return (
		<>
			<Tooltip title={title}>
				<IconButton
					className={className}
					onClick={open ? onClose : onOpen}
					aria-expanded={open}
					aria-haspopup='true'
					aria-controls={popupId}
					ref={setRef}>
					{icon}
				</IconButton>
			</Tooltip>
			{content}
		</>
	);
};
