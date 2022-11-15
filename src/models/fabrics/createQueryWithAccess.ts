/* eslint-disable import/no-extraneous-dependencies */
import {
	Contract,
	createQuery,
	InvalidDataError,
	Query,
} from '@farfetched/core';
import { Effect } from 'effector';
import {
	StaticOrReactive,
	TwoArgsDynamicallySourcedField,
} from '@farfetched/core/misc/sourced';
import { Serialize } from '@farfetched/core/serialization/type';
import { Validator } from '@farfetched/core/validation/type';
import { AccessOptions, StandardFailError } from '@/packages';
import { attachWithAccessToken, WithoutAccess } from './attachWithAccessToken';
import { attachRemoteOperationWithAccess } from './attachRemoteOperationWithAccess';

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
	readonly mapData: TwoArgsDynamicallySourcedField<
		ContractData,
		Params,
		MappedData,
		MapDataSource
	>;
	readonly validate?: Validator<ContractData, Params, ValidationSource>;
	readonly name?: string;
	readonly enabled?: StaticOrReactive<boolean>;
	readonly serialize?: Serialize<MappedData>;
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
): Query<WithoutAccess<Params>, MappedData, Error | InvalidDataError> => {
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
