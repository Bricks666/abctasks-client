import * as React from 'react';

import { CommonProps } from '@/shared/types';
import { Center, Layout } from '@/shared/ui';

import { AuthHeader } from '../auth-header';

export interface AuthLayoutProps extends CommonProps {}

export const AuthLayout: React.FC<React.PropsWithChildren<AuthLayoutProps>> = (
	props
) => {
	const { className, children, } = props;
	return (
		<Layout
			className={className}
			slots={{
				header: <AuthHeader />,
			}}>
			<Center height='container'>{children}</Center>
		</Layout>
	);
};
