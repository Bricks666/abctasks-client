import * as React from 'react';

import { CommonProps } from '@/shared/types';
import { Layout } from '@/shared/ui';

import { RoomsHeader } from '../rooms-header';

export interface RoomsLayoutProps
	extends CommonProps,
		Required<React.PropsWithChildren> {}

export const RoomsLayout: React.FC<RoomsLayoutProps> = (props) => {
	const { className, children, } = props;

	return (
		<Layout
			className={className}
			slots={{
				header: <RoomsHeader />,
			}}>
			{children}
		</Layout>
	);
};
