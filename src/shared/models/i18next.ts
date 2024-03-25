import { createEffect, createEvent, createStore, sample } from 'effector';

import { i18n } from '../configs';

import { started } from './app';

export type AllowedLanguages = 'ru' | 'en';

export const $language = createStore<AllowedLanguages>(
	i18n.language as AllowedLanguages
);

export const changeLanguage = createEvent<AllowedLanguages>();
const setLanguage = createEvent<AllowedLanguages>();

const subscribeI18NextEventsFx = createEffect(() => {
	i18n.on('languageChanged', (lang) => {
		const language = lang.split('-');

		setLanguage(language[0]);
	});
});
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
	target: setLanguage,
});

sample({
	clock: started,
	target: subscribeI18NextEventsFx,
});

sample({
	clock: setLanguage,
	target: $language,
});
