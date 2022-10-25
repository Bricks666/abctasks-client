import { SxProps } from '@mui/material';

export const fromSx: SxProps = {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: '1em',

	padding: '0.5em',
};

export const fieldSx: SxProps = {
	gridColumn: 'span 2',
};

export const buttonSx: SxProps = {
	gridColumn: 2,
	justifySelf: 'end',
};
