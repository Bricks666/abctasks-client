import { Card, styled, Typography } from '@mui/material';

interface StyledCardProps {
	readonly isDrag: boolean;
}

export const StyledCard = styled(Card)<StyledCardProps>`
	width: 100%;

	box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;

	cursor: move;

	:hover {
		box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
	}
	${(props) => (props.isDrag ? 'opacity: 0.1;' : '')}
`;

export const StyledContent = styled(Typography)`
	word-break: break-all;
`;
