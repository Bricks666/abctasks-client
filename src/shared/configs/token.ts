import { createDomain, sample } from 'effector';

const tokensDomain = createDomain();

export const $token = tokensDomain.store<string | null>(null);
export const $bearerToken = $token.map((token) =>
	token ? `Bearer ${token}` : null
);

export const setToken = tokensDomain.event<string | null>();

sample({
	clock: setToken,
	target: $token,
});
