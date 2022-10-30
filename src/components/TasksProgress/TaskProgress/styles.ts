import {
	LinearProgress,
	linearProgressClasses,
	styled,
	Typography,
} from '@mui/material';
import { HEX } from '@/types';

export const StyledLegend = styled(Typography)`
	display: flex;
	justify-content: space-between;
`;

interface StyledProgressProps {
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export const StyledProgress = styled(LinearProgress, {
	shouldForwardProp: (prop) => prop !== 'mainColor' && prop !== 'secondColor',
})<StyledProgressProps>`
	height: 10px;

	border-radius: 8px;
	background-color: ${(props) => props.secondColor};

	& .${linearProgressClasses.bar} {
		background-color: ${(props) => props.mainColor};
	}
`;
