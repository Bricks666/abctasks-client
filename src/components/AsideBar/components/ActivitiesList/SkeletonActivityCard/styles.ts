import { styled, CardContent, Card } from '@mui/material';

export const StyledCard = styled(Card)`
	overflow: unset;
`;

export const StyledCardContent = styled(CardContent)`
	display: grid;
	grid-template-columns: max-content 1fr;
	grid-template-rows: max-content 1fr;
	column-gap: 1.25em;
`;

export const StyledBlock = styled('div')`
	grid-row: span 2;

	width: 100%;
`;
