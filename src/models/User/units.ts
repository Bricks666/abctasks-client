/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { UpdateUserRequest, User, UserResponse } from './types';

export const initialUser = { userId: 0, login: '', photo: null };

export const UserDomain = createDomain('UserDomain');

export const $User = UserDomain.store<User>(initialUser, {
	name: 'User',
});

export const loadUserFx = UserDomain.effect<void, UserResponse>('loadUserFx');
export const updateProfileFx = UserDomain.effect<
	UpdateUserRequest,
	UserResponse
>('updateProfileFx');

export const loadUser = UserDomain.event<void>('loadUserEvent');
export const updateProfile =
	UserDomain.event<UpdateUserRequest>('updateProfileEvent');
