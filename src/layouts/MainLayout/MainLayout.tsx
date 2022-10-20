import * as React from 'react';
import { CommonProps } from '@/types/common';
// import { Header } from '@/components/Header';
import { StyledWrapper } from './styles';

export interface MainLayoutProps extends CommonProps {}

export const MainLayout: React.FC<React.PropsWithChildren<MainLayoutProps>> = (
	props
) => {
	const { className, children } = props;
	return (
		<StyledWrapper>
			{/* <Header /> */}
			<main className={className}>{children}</main>
		</StyledWrapper>
	);
};
