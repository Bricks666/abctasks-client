import { createDomain, sample } from 'effector';
import { debug } from 'patronum';

const tokensDomain = createDomain();

export const $token = tokensDomain.store<string | null>(null);

export const setToken = tokensDomain.event<string | null>();

sample({
	clock: setToken,
	target: $token,
});

debug($token);
