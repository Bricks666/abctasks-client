import { Effect, Event } from 'effector';
import { Template, String } from 'runtypes';

export const hex = Template`#${String.withConstraint(
	(code) => code.length === 3 || code.length === 6
)}`;
export type HEX = `#${string}`;

export type Fn<Params extends Array<unknown>, Result> = (
	...args: Params
) => Result;

export type AnyFunction = Fn<any[], any>;
export type VoidFunction = Fn<[], void>;

export interface ChainedParams {
	readonly otherwise?: Event<any> | Effect<any, any>;
}
