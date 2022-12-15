/* eslint-disable import/no-extraneous-dependencies */
import {
	Contract,
	createQuery,
	DynamicallySourcedField,
	InvalidDataError,
	Query,
	Validator
} from '@farfetched/core';
import { Effect } from 'effector';
import { AccessOptions, StandardFailError } from '@/shared/packages';
import { attachRemoteOperationWithAccess } from './attachRemoteOperationWithAccess';
import { attachWithAccessToken, WithoutAccess } from './attachWithAccessToken';

export interface CreateQueryWithAccessOptions<
	Params extends AccessOptions,
	Response,
	Error extends StandardFailError,
	ContractData extends Response,
	MappedData,
	MapDataSource = void,
	ValidationSource = void
> {
	readonly effect: Effect<Params, Response, Error>;
	readonly contract: Contract<Response, ContractData>;
	readonly mapData: DynamicallySourcedField<
		{ result: ContractData; params: Params },
		MappedData,
		MapDataSource
	>;
	readonly initialValue?: MappedData;
	readonly validate?: Validator<ContractData, Params, ValidationSource>;
	readonly name?: string;
}

export const createQueryWithAccess = <
	Params extends Required<AccessOptions>,
	Response,
	Error extends StandardFailError,
	ContractData extends Response,
	MappedData,
	MapDataSource = void,
	ValidationSource = void
>(
		options: CreateQueryWithAccessOptions<
		Params,
		Response,
		Error,
		ContractData,
		MappedData,
		MapDataSource,
		ValidationSource
	>
	): Query<
	WithoutAccess<Params>,
	MappedData,
	Error | InvalidDataError,
	MappedData
> => {
	const { effect, ...rest } = options;
	const attached = attachWithAccessToken({
		effect,
	});
	const query = createQuery<
		WithoutAccess<Params>,
		Response,
		Error,
		ContractData,
		MappedData,
		MapDataSource,
		ValidationSource
	>({
		...rest,
		effect: attached,
	} as any);

	attachRemoteOperationWithAccess(query);

	return query as any;
};
