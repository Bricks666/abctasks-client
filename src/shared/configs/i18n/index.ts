import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		partialBundledLanguages: true,
		debug: import.meta.env.DEV,
		interpolation: {
			escapeValue: false,
		},
		supportedLngs: ['ru', 'en'],
		load: 'languageOnly',
		defaultNS: ['common'],
		resources: {},
	});

export { i18n };
