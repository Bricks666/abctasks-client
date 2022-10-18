/* eslint-disable import/no-extraneous-dependencies */
import { Effect, Store } from 'effector';
import { attach, createStore, sample } from 'effector-logger';
import { AccessOptions } from '@/packages/request';
import { $AccessToken, refreshFx } from './units';
import { StandardFailError } from '@/packages/request/error';

export interface AttachWithAccessTokenOptions<
	Params extends Required<AccessOptions>,
	Done,
	Fail extends StandardFailError
> {
	readonly effect: Effect<Params, Done, Fail>;
	readonly refetch?: boolean;
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
	const { effect, name, refetch = true } = options;

	const newEffect = attach<
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

	if (refetch) {
		const $IsRetry = createStore(false);
		const $LastParams = createStore<Params | null>(null);

		sample({
			clock: effect.fail,
			source: $IsRetry,
			filter: (isRetry, { error }) => !isRetry && error.statusCode === 401,
			fn: (_, { params }) => params,
			target: $LastParams,
		});

		sample({
			clock: effect.failData,
			source: $IsRetry,
			filter: (isRetry, error) => error.statusCode === 401 && !isRetry,
			target: refreshFx,
		});

		sample({
			clock: refreshFx,
			fn: () => true,
			target: $IsRetry,
		});

		sample({
			clock: refreshFx.doneData,
			source: $LastParams,
			filter: Boolean,
			target: effect,
		});

		sample({
			clock: refreshFx.doneData,
			fn: () => false,
			target: $IsRetry,
		});
	}

	return newEffect;
};
