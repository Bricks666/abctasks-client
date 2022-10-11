import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { Header } from '@/components/Header';

export interface MainLayoutProps extends CommonProps {}

export const MainLayout: React.FC<React.PropsWithChildren<MainLayoutProps>> = (
	props
) => {
	const { className, children } = props;
	return (
		<div className={className}>
			<Header />
			<main>{children}</main>
		</div>
	);
};
