/* eslint-disable import/no-extraneous-dependencies */
import { Effect, Store } from 'effector';
import { attach } from 'effector-logger';
import { AccessOptions, StandardFailError } from '@/packages';
import { $AccessToken } from '../auth/units';

export interface AttachWithAccessTokenOptions<
	Params extends Required<AccessOptions>,
	Done,
	Fail extends StandardFailError
> {
	readonly effect: Effect<Params, Done, Fail>;
	readonly name?: string;
}

export type WithoutAccess<Params extends Required<AccessOptions>> = Omit<
	Params,
	keyof Required<AccessOptions>
>;

export const attachWithAccessToken = <
	Params extends Required<AccessOptions>,
	Done,
	Fail extends StandardFailError
>(
	options: AttachWithAccessTokenOptions<Params, Done, Fail>
): Effect<WithoutAccess<Params>, Done, Fail> => {
	const { effect, name } = options;

	return attach<
		WithoutAccess<Params>,
		Store<string | null>,
		Effect<Params, Done, Fail>
	>({
		effect,
		source: $AccessToken,
		mapParams: (params, accessToken): Params =>
			({
				...params,
				accessToken,
			} as Params),
		name,
	});
};
