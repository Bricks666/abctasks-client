import { Stack, styled, SxProps } from '@mui/material';

export const StyledWrapper = styled(Stack)`
	@media (max-width: 1300px) {
		background-color: white;

		padding: 1rem;
		border-radius: 8px;
	}
`;

export const titleSx: SxProps = {
	padding: '0 1em',
	fontWeight: 700,
};

export const StyledList = styled(Stack)`
	padding: 0 1em;

	overflow: scroll;
`;
