export type Size = 'small' | 'medium' | 'large';
export type Color =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'error'
	| 'warning'
	| 'dark';

export interface BasePopupProps {
	readonly isOpen: boolean;
}
