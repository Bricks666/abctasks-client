import * as React from 'react';
import { Container } from '@mui/material';
import { CommonProps } from '@/types/common';
import { Header } from '@/components/Header';

export interface MainLayoutProps extends CommonProps {}

export const MainLayout: React.FC<React.PropsWithChildren<MainLayoutProps>> = (
	props
) => {
	const { className, children } = props;
	return (
		<Container className={className}>
			<Header />
			<main>{children}</main>
		</Container>
	);
};
