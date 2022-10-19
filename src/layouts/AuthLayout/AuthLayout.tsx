import * as React from 'react';
import { Container } from '@mui/material';
import { CommonProps } from '@/types/common';
import { StyledMain } from './styles';

export interface AuthLayoutProps extends CommonProps {}

export const AuthLayout: React.FC<React.PropsWithChildren<AuthLayoutProps>> = (
	props
) => {
	const { className, children } = props;
	return (
		<Container>
			<StyledMain className={className}>{children}</StyledMain>
		</Container>
	);
};
