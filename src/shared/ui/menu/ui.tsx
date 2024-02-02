import { Menu as MUIMenu, MenuProps as MUIMenuProps } from '@mui/material';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import { MenuProvider } from './lib';

export interface MenuProps
	extends CommonProps,
		React.PropsWithChildren,
		MUIMenuProps {}

export const Menu: React.FC<MenuProps> = (props) => {
	const { onClose, children, ...rest } = props;

	return (
		<MUIMenu {...rest} onClose={onClose}>
			<MenuProvider value={{ onClose, }}>{children}</MenuProvider>
		</MUIMenu>
	);
};
