import { Template, String, Static } from 'runtypes';
import { CloseConnect } from '@/packages/eventSource';

export const hex = Template`#${String.withConstraint(
	(code) => code.length === 3 || code.length === 6
)}`;
export type HEX = Static<typeof hex>;

/* TODO: Изменить типизацию на более конкретную */
export type DateType = string;

export interface CommonProps {
	className?: string;
}

export type MappedObject<V> = {
	[key: string]: V;
};
export type AnyObject = MappedObject<any>;

export type ExtractProps<
	T extends AnyFunction,
	K extends keyof Parameters<T>[0] = never
> = Omit<Parameters<T>[0], K>;

export type AnyFunction = (...args: any[]) => any;

export interface BasePopupProps {
	readonly isOpen: boolean;
}

export type ID = string | number;

export type WithCloseRef = { closeRef: { current: CloseConnect | null } };

export type VoidFunction = () => void;

export type AddType<T extends AnyObject, AT> = {
	[K in keyof T]: T[K] | AT;
};
