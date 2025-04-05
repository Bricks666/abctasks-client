import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { __DEV__ } from '../const';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		partialBundledLanguages: true,
		debug: __DEV__,
		appendNamespaceToCIMode: true,
		appendNamespaceToMissingKey: true,
		interpolation: {
			escapeValue: false,
		},
		supportedLngs: ['ru', 'en'],
		load: 'languageOnly',
		defaultNS: ['common'],
		resources: {},
	});

export { i18n };
