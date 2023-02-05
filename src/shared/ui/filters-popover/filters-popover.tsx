import TuneIcon from '@mui/icons-material/Tune';
import { Tooltip, IconButton, Popover } from '@mui/material';
import * as React from 'react';
import { CommonProps, VoidFunction } from '@/shared/types';

export interface FiltersPopoverProps extends CommonProps {
	readonly filters: React.ReactElement;
	readonly title: string;
	readonly open: boolean;
	readonly onOpen: VoidFunction;
	readonly onClose: VoidFunction;
}

export const FiltersPopover: React.FC<FiltersPopoverProps> = (props) => {
	const { filters, className, onClose, onOpen, open, title, } = props;

	const [ref, setRef] = React.useState<HTMLElement | null>(null);

	return (
		<>
			<Tooltip title={title}>
				<IconButton
					className={className}
					onClick={open ? onClose : onOpen}
					ref={setRef}>
					<TuneIcon />
				</IconButton>
			</Tooltip>
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
				{filters}
			</Popover>
		</>
	);
};
