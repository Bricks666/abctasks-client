import { SxProps } from '@mui/material';

export const formSx: SxProps = {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: '1em',
	width: '100%',
};

export const selectSx: SxProps = {
	width: '100%',
	height: '4em',
};
export const fieldSx: SxProps = {
	gridColumn: 'span 2',
	height: '6em',
};

export const buttonSx: SxProps = {
	gridColumn: 2,
	justifySelf: 'end',
	width: '7em',
	height: '3em',
};
