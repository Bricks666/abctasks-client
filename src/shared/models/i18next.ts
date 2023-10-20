import { createI18nextIntegration } from '@withease/i18next';

import { i18n } from '../configs';

import { started } from './app';

export const integration = createI18nextIntegration({
	instance: i18n,
	setup: started,
});
