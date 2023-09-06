import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';
import * as React from 'react';

import { User } from '@/shared/api';
import { stringToColor } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface UserAvatarProps
	extends CommonProps,
		Pick<User, 'email' | 'photo' | 'username'> {}

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
	const { username, photo, email, className, } = props;
	return (
		<Avatar
			className={className}
			src={photo ?? ''}
			alt={username}
			sx={{ backgroundColor: stringToColor(email), }}>
			<AccountCircleIcon />
		</Avatar>
	);
};
