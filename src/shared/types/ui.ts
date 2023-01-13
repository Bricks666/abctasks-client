export type Size = 'small' | 'medium' | 'large';

export interface CommonProps {
	className?: string;
}

export interface BasePopupProps extends CommonProps {
	readonly isOpen: boolean;
}
