import { forward, guard, sample } from 'effector';
import { getProfileApi, updateProfileApi } from '@/api';
import {
	$User,
	initialUser,
	loadUser,
	loadUserFx,
	updateProfile,
	updateProfileFx,
} from '.';
import { authFx, loginFx, logoutFx } from '../Auth';
import { mayStartFxHandler } from '../handlers';

loadUserFx.use(getProfileApi);
updateProfileFx.use(updateProfileApi);

sample({
	clock: [updateProfileFx.doneData],
	fn: (response) => response.user,
	target: $User,
});

forward({
	from: [authFx.doneData, loginFx.doneData],
	to: loadUser,
});

guard({
	clock: loadUser,
	filter: mayStartFxHandler(loadUserFx.pending),
	target: loadUserFx,
});

sample({
	clock: loadUserFx.doneData,
	fn: (response) => response.user,
	target: $User,
});

sample({
	clock: logoutFx.doneData,
	fn: () => initialUser,
	target: $User,
});

guard({
	clock: updateProfile,
	filter: mayStartFxHandler(updateProfileFx.pending),
	target: updateProfileFx,
});
