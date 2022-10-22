import * as React from 'react';
import { CommonProps } from '@/types/common';
import { StyledWrapper } from './styles';
// import { Header } from '@/components/Header';

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
