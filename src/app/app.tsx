import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { colorSchemeModel } from '@/shared/models';
import { LoadingIndicator, Center } from '@/shared/ui';

import { withProviders } from './providers';

import { Pages } from '@/pages';


import './index.css';

export const App = withProviders(() => {
	const { t, } = useTranslation('common');
	colorSchemeModel.useSyncScheme();

	const loadingText = t('loading');

	return (
		<React.Suspense
			fallback={
				<Center height='page'>
					<LoadingIndicator text={loadingText} />
				</Center>
			}>
			<Pages />
		</React.Suspense>
	);
});
