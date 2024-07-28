import { Menu, MenuProps } from '@/shared/ui';
import { PropsWithChildren, createElement } from 'react';

export const createMenuProvider = (defaultProps: MenuProps) => {
	return (props: PropsWithChildren) => {
		return createElement(Menu, { ...defaultProps, ...props });
	};
};
