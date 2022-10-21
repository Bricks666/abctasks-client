import { styled, Typography } from '@mui/material';
import { HEX } from '@/types/common';

interface StyledTitleProps {
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export const StyledTitle = styled(Typography, {
	shouldForwardProp: (prop) => prop !== 'mainColor' && prop !== 'secondColor',
})<StyledTitleProps>`
	display: inline-block;

	width: max-content;

	padding: 2px 13px;

	border-radius: 100px;

	background-color: ${(props) => props.secondColor};

	color: ${(props) => props.mainColor};
`;
