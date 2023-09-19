import { ReactNode } from 'react';

export type Size = 'small' | 'medium' | 'large';

export interface CommonProps {
	className?: string;
}

export interface BasePopupProps extends CommonProps {
	readonly isOpen: boolean;
	readonly slots?: Slots<'actions'>;
}

interface SinglePickerProps<T> {
	readonly onChange: (value: T | null) => unknown;
	readonly value: T | null;
	readonly multiple?: never;
	readonly limitTags?: never;
}

interface MultiplePickerProps<T> {
	readonly onChange: (value: T[]) => unknown;
	readonly value: T[];
	readonly multiple: true;
	readonly limitTags?: number;
}

export type PickerProps<T> = SinglePickerProps<T> | MultiplePickerProps<T>;

export type Slots<T extends string> = {
	readonly [K in T]?: ReactNode | null;
};
