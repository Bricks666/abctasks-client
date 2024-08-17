import { AuthResponse } from '@/shared/api';
import { Tokens } from '@/shared/api/request';

import { defaultUser } from './users';

export const tokens: Tokens = {
	accessToken: 'accessToken',
	refreshToken: 'refreshToken',
};

export const defaultAuthData: AuthResponse = {
	user: defaultUser,
	tokens,
};
