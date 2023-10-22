import * as React from 'react';

import { CommonProps } from '@/shared/types';
import { Layout } from '@/shared/ui';

import { MainHeader } from '../main-header';

export interface MainLayoutProps
	extends CommonProps,
		Required<React.PropsWithChildren> {}

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
	const { className, children, } = props;

	return (
		<Layout
			className={className}
			slots={{
				header: <MainHeader />,
			}}>
			{children}
		</Layout>
	);
};
