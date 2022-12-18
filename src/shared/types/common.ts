/* eslint-disable @typescript-eslint/no-explicit-any */
import { Template, String, Static } from 'runtypes';

export const hex = Template`#${String.withConstraint(
	(code) => code.length === 3 || code.length === 6
)}`;
export type HEX = Static<typeof hex>;

export interface CommonProps {
	className?: string;
}

export type AnyObject = Record<string, any>;

export type ExtractProps<
	T extends AnyFunction,
	K extends keyof Parameters<T>[0] = never
> = Omit<Parameters<T>[0], K>;

export type AnyFunction = (...args: any[]) => any;

export type VoidFunction = () => void;

export type AddType<T extends AnyObject, AT> = {
	[K in keyof T]: T[K] | AT;
};
