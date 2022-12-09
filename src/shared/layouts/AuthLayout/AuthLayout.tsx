import { Container } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import styles from './AuthLayout.module.css';
import { CommonProps } from '@/types';

export interface AuthLayoutProps extends CommonProps {}

export const AuthLayout: React.FC<React.PropsWithChildren<AuthLayoutProps>> = (
	props
) => {
	const { className, children, } = props;
	return (
		<Container>
			<main className={cn(styles.main, className)}>{children}</main>
		</Container>
	);
};
