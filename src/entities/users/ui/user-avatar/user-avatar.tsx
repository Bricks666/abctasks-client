import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Tooltip } from '@mui/material';
import * as React from 'react';

import { User } from '@/shared/api';
import { stringToColor } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface UserAvatarProps
	extends CommonProps,
		Pick<User, 'email' | 'photo' | 'username'> {
	readonly size?: number;
	readonly disableTooltip?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
	const { username, photo, email, className, size, disableTooltip, } = props;
	return (
		<Tooltip title={username} disableHoverListener={disableTooltip}>
			<Avatar
				className={className}
				src={photo ?? ''}
				alt={username}
				sx={{
					backgroundColor: stringToColor(email),
					width: size,
					height: size,
				}}>
				<AccountCircleIcon />
			</Avatar>
		</Tooltip>
	);
};
