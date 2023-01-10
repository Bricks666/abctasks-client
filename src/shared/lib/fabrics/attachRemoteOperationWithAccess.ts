import { InvalidDataError, Query, Mutation } from '@farfetched/core';
import { sample, createDomain } from 'effector';
import { authApi, Tokens } from '@/shared/api';
import { tokenModel } from '@/shared/configs';
import { AccessOptions, StandardFailError } from '@/shared/lib';
import { StandardResponse } from '@/shared/types';
import { WithoutAccess } from './attachWithAccessToken';

const remoteOperationDomain = createDomain();

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
	const $isRetry = remoteOperationDomain.store<boolean>(false);

	const refreshFx = remoteOperationDomain.effect<
		void,
		StandardResponse<Tokens>
	>(authApi.refresh);

	const unauthorized = remoteOperationDomain.event();
	const successReauthorized = remoteOperationDomain.event();

	sample({
		clock: remoteOperation.finished.failure,
		source: $isRetry,
		filter: (isRetry, { error, }) => {
			return !isRetry && 'statusCode' in error && error.statusCode === 401;
		},
		target: unauthorized,
	});

	sample({
		clock: unauthorized,
		fn: () => true,
		target: $isRetry,
	});

	sample({
		clock: unauthorized,
		target: refreshFx,
	});

	sample({
		clock: refreshFx.doneData,
		fn: (result) => result.data.accessToken,
		target: tokenModel.setToken,
	});

	sample({
		clock: refreshFx.doneData,
		target: successReauthorized,
	});

	sample({
		clock: successReauthorized,
		source: remoteOperation.finished.failure,
		fn: ({ params, }) => params,
		target: remoteOperation.start,
	});

	sample({
		clock: successReauthorized,
		fn: () => false,
		target: $isRetry,
	});

	sample({
		clock: refreshFx.failData,
		source: remoteOperation.finished.failure,
		target: remoteOperation.finished.failure,
	});
};
