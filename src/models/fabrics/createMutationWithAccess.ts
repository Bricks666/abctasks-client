/* eslint-disable import/no-extraneous-dependencies */
import {
	Contract,
	createMutation,
	InvalidDataError,
	Mutation,
} from '@farfetched/core';
import { Effect } from 'effector';
import { StaticOrReactive } from '@farfetched/core/misc/sourced';
import { AccessOptions, StandardFailError } from '@/packages/request';
import { attachWithAccessToken, WithoutAccess } from './attachWithAccessToken';
import { attachRemoteOperationWithAccess } from './attachRemoteOperationWithAccess';

export interface CreateMutationWithAccessOptions<
	Params extends Required<AccessOptions>,
	Data,
	ContractData extends Data,
	Error extends StandardFailError
> {
	effect: Effect<Params, Data, Error>;
	contract: Contract<Data, ContractData>;
	readonly name?: string;
	readonly enabled?: StaticOrReactive<boolean>;
}

export const createMutationWithAccess = <
	Params extends Required<AccessOptions>,
	Data,
	ContractData extends Data,
	Error extends StandardFailError
>(
	options: CreateMutationWithAccessOptions<Params, Data, ContractData, Error>
): Mutation<WithoutAccess<Params>, ContractData, Error | InvalidDataError> => {
	const { effect, ...rest } = options;
	const attached = attachWithAccessToken({
		effect,
	});
	const mutation = createMutation<
		WithoutAccess<Params>,
		Data,
		ContractData,
		Error
	>({
		...rest,
		effect: attached,
	});

	attachRemoteOperationWithAccess(mutation);

	return mutation as any;
};
