import { Stack, styled, SxProps } from '@mui/material';

export const StyledWrapper = styled(Stack)`
	overflow-y: auto;
`;

export const titleSx: SxProps = {
	fontWeight: 700,
	padding: '0 1em',
};

export const StyledList = styled(Stack)`
	overflow-y: scroll;

	padding: 0 1em;
`;
