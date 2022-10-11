import * as React from 'react';
import { CommonProps } from '@/interfaces/common';

export interface AuthLayoutProps extends CommonProps {}

export const AuthLayout: React.FC<React.PropsWithChildren<AuthLayoutProps>> = (
	props
) => {
	const { className, children } = props;
	return (
		<div className={className}>
			<main>{children}</main>
		</div>
	);
};
