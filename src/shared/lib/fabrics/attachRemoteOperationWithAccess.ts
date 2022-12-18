/* eslint-disable import/no-extraneous-dependencies */
import { InvalidDataError, Query, Mutation } from '@farfetched/core';
import { sample, createDomain } from 'effector';
import { authApi, Tokens } from '@/shared/api';
import { tokenModel } from '@/shared/configs';
import { AccessOptions, StandardFailError } from '@/shared/lib';
import { StandardResponse } from '@/shared/types';
import { WithoutAccess } from './attachWithAccessToken';

const AttachWithDomain = createDomain();

export const attachRemoteOperationWithAccess = <
	Params extends Required<AccessOptions>,
	Error extends StandardFailError,
	MappedData,
	Meta
>(
		remoteOperation:
		| Query<WithoutAccess<Params>, MappedData, Error | InvalidDataError, Meta>
		| Mutation<WithoutAccess<Params>, MappedData, Error | InvalidDataError>
	): void => {
	// eslint-disable-next-line no-underscore-dangle
	const { name, } = remoteOperation.__.executeFx;

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

	/**
	 * TODO: Перезапрос токена
	 */
	sample({
		clock: remoteOperation.finished.failure,
		source: $IsRetry,
		filter: (isRetry, { error, }) => {
			return !isRetry && 'statusCode' in error && error.statusCode === 401;
		},
		fn: (_, { params, }) => params,
		target: [$LastParams, refreshFx],
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
		target: tokenModel.$token,
	});

	sample({
		clock: refreshFx.doneData,
		source: $LastParams,
		filter: Boolean,
		fn: (params) => params,
		target: remoteOperation.start,
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
};
