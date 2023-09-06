import { Container } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import { Center } from '../center';

import styles from './auth-layout.module.css';

export interface AuthLayoutProps extends CommonProps {}

export const AuthLayout: React.FC<React.PropsWithChildren<AuthLayoutProps>> = (
	props
) => {
	const { className, children, } = props;
	return (
		<Container>
			<Center fullHeight>
				<main className={cn(styles.main, className)}>{children}</main>
			</Center>
		</Container>
	);
};
