import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/shared/configs';

export const withI18n =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<I18nextProvider i18n={i18n}>
					<Component />
				</I18nextProvider>
			);
		};
