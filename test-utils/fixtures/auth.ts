import type { AuthResponseDto, TokensDto } from '@/shared/api';

import { defaultUser } from './users';

export const tokens: TokensDto = {
	accessToken: 'accessToken',
	refreshToken: 'refreshToken',
};

export const defaultAuthData: AuthResponseDto = {
	user: defaultUser,
	tokens,
};
