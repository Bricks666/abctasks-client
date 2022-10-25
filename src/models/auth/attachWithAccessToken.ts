/* eslint-disable import/no-extraneous-dependencies */
import { Effect, Store } from 'effector';
import { attach, createDomain, sample } from 'effector-logger';
import { AccessOptions, StandardFailError } from '@/packages/request';
import { $AccessToken } from './units';
import { StandardResponse } from '@/types';
import { Tokens } from './types';
import { authApi } from '@/api';

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

const AttachWithDomain = createDomain('AttachWithDomain');

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
		const $IsRetry = AttachWithDomain.store<boolean>(false, {
			name: `IsRetry-${name}`,
		});
		const $LastParams = AttachWithDomain.store<WithoutAccess<Params> | null>(
			null,
			{
				name: `LastParams-${name}`,
			}
		);
		const refreshFx = AttachWithDomain.effect<void, StandardResponse<Tokens>>(
			`refreshFx-${name}`
		);
		refreshFx.use(authApi.refresh);

		sample({
			clock: newEffect.fail,
			source: $IsRetry,
			filter: (isRetry, { error }) => {
				return !isRetry && error.statusCode === 401;
			},
			fn: (_, { params }) => params,
			target: $LastParams,
		});

		sample({
			clock: newEffect.failData,
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
			filter: (data) => data.data !== null,
			fn: (data) => data.data!.accessToken,
			target: $AccessToken,
		});

		sample({
			clock: refreshFx.doneData,
			source: $LastParams,
			filter: Boolean,
			fn: (params) => params,
			target: newEffect,
		});

		sample({
			clock: refreshFx.doneData,
			fn: () => false,
			target: $IsRetry,
		});

		sample({
			clock: refreshFx.failData,
			fn: (data) => data,
		});
	}

	return newEffect;
};
