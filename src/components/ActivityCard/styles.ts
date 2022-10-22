import { Avatar, AvatarProps, Card, CardContent, styled } from '@mui/material';
import { Color } from '@/types/ui';

export const StyledCard = styled(Card)`
	overflow: unset;
`;

interface StyledAvatarProps extends AvatarProps {
	readonly color: Exclude<Color, 'primary' | 'secondary' | 'dark'>;
}

export const StyledAvatar = styled(Avatar, {
	shouldForwardProp: (prop) => prop !== 'color',
})<StyledAvatarProps>(({ theme, color }) => {
	return {
		backgroundColor: theme.palette[color].light,
	};
});

export const StyledCardContent = styled(CardContent)`
	display: flex;
	column-gap: 1.25em;
`;
