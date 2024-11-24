import { Menu, MenuProps } from '@/shared/ui';
import { PropsWithChildren, createElement } from 'react';

export const createMenuProvider = (
	defaultProps: MenuProps = { open: true, anchorEl: document.body }
) => {
	return (props: PropsWithChildren) => {
		return createElement(Menu, { ...defaultProps, ...props });
	};
};
