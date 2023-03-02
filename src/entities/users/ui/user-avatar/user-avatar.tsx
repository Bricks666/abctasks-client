import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';
import * as React from 'react';
import { stringToColor } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface UserAvatarProps extends CommonProps {
	readonly photo: string | null;
	readonly username: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
	const { username, photo, className, } = props;
	return (
		<Avatar
			className={className}
			src={photo ?? ''}
			sx={{ backgroundColor: stringToColor(username), }}>
			<AccountCircleIcon />
		</Avatar>
	);
};
