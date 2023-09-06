import { CircularProgress } from '@mui/material';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import { Center } from '../center';

export interface PageLoaderProps extends CommonProps {}

export const PageLoader: React.FC<PageLoaderProps> = (props) => {
	const { className, } = props;

	return (
		<Center className={className} fullHeight>
			<CircularProgress size={80} />
		</Center>
	);
};
