import { Avatar } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export interface UserAvatarProps extends CommonProps {
	readonly photo: string | null;
	readonly login: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
	const { login, photo, className, } = props;
	const shortLogin = login.slice(0, 3);
	return (
		<Avatar className={className} src={photo ?? ''}>
			{shortLogin}
		</Avatar>
	);
};
