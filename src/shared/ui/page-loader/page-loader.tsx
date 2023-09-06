import * as React from 'react';

import { CommonProps } from '@/shared/types';

import { Center } from '../center';
import { LoadingIndicator } from '../loading-indicator';

export interface PageLoaderProps extends CommonProps {}

export const PageLoader: React.FC<PageLoaderProps> = (props) => {
	const { className, } = props;

	return (
		<Center className={className}>
			<LoadingIndicator />
		</Center>
	);
};
