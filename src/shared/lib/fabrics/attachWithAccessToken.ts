import { Effect, Store, attach } from 'effector';
import { tokenModel } from '@/shared/configs';
/* eslint-disable import/no-extraneous-dependencies */
import { AccessOptions, StandardFailError } from '@/shared/packages';

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
	const { effect, name, } = options;

	return attach<
		WithoutAccess<Params>,
		Store<string | null>,
		Effect<Params, Done, Fail>
	>({
		effect,
		source: tokenModel.$token,
		mapParams: (params, accessToken): Params =>
			({
				...params,
				accessToken,
			} as Params),
		name,
	});
};
