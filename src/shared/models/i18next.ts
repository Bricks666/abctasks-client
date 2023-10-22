import { createI18nextIntegration } from '@withease/i18next';
import { createEffect, createEvent, createStore, sample } from 'effector';

import { i18n } from '../configs';

import { started } from './app';

export const integration = createI18nextIntegration({
	instance: i18n,
	setup: started,
});

export type AllowedLanguages = 'ru' | 'en';

export const $language = createStore<AllowedLanguages>(
	i18n.language as AllowedLanguages
);
export const changeLanguage = createEvent<AllowedLanguages>();
const changeLanguageFx = createEffect((language: AllowedLanguages) => {
	i18n.changeLanguage(language);

	return language;
});

sample({
	clock: changeLanguage,
	source: $language,
	filter: (usingLanguage, language) => {
		return usingLanguage !== language;
	},
	fn: (_, language) => language,
	target: changeLanguageFx,
});

sample({
	clock: changeLanguageFx.doneData,
	target: $language,
});

sample({
	clock: started,
	fn: () => i18n.language as AllowedLanguages,
	target: $language,
});
