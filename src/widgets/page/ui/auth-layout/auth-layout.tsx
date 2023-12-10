import * as React from 'react';

import { Classes, CommonProps } from '@/shared/types';
import { Center, Layout } from '@/shared/ui';

import { AuthHeader } from '../auth-header';

export interface AuthLayoutProps extends CommonProps {
	readonly classes?: Classes<'header' | 'center'>;
}

export const AuthLayout: React.FC<React.PropsWithChildren<AuthLayoutProps>> = (
	props
) => {
	const { className, classes, children, } = props;
	return (
		<Layout
			className={className}
			slots={{
				header: <AuthHeader className={classes?.header} />,
			}}>
			<Center className={classes?.center} height='container'>
				{children}
			</Center>
		</Layout>
	);
};
