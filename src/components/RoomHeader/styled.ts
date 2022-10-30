import { styled, SxProps } from '@mui/material';

export const StyledWrapper = styled('header')`
	display: grid;
	grid-template-columns: 1fr max-content;
	column-gap: 1em;
	align-items: center;

	padding: 2rem 0;
`;

export const titleSx: SxProps = {
	fontWeight: 700,
};
