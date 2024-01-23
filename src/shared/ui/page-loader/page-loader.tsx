import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { Center } from '../center';
import { LoadingIndicator } from '../loading-indicator';

export interface PageLoaderProps extends CommonProps {}

export const PageLoader: React.FC<PageLoaderProps> = (props) => {
	const { className, } = props;

	const { t, } = useTranslation('common');

	const loadingText = t('loading');

	return (
		<Center className={className} height='page'>
			<LoadingIndicator text={loadingText} />
		</Center>
	);
};
