import {
	Contract,
	createMutation,
	InvalidDataError,
	Mutation
} from '@farfetched/core';
import { Effect } from 'effector';
import { AccessOptions, StandardFailError } from '@/shared/lib';
import { attachRemoteOperationWithAccess } from './attachRemoteOperationWithAccess';
import { attachWithAccessToken, WithoutAccess } from './attachWithAccessToken';

export interface CreateMutationWithAccessOptions<
	Params extends Required<AccessOptions>,
	Data,
	ContractData extends Data,
	Error extends StandardFailError
> {
	effect: Effect<Params, Data, Error>;
	contract: Contract<Data, ContractData>;
	readonly name?: string;
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
