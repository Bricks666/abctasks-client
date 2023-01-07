import { createDomain, sample } from 'effector';

const tokensDomain = createDomain();

export const $token = tokensDomain.store<string | null>(null);

export const setToken = tokensDomain.event<string | null>();

sample({
	clock: setToken,
	target: $token,
});

$token.watch(console.log);
