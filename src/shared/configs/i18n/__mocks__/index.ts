import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	fallbackLng: 'ru',
	debug: false,
	interpolation: {
		escapeValue: false,
	},
	supportedLngs: ['ru', 'en'],
	load: 'languageOnly',
	defaultNS: ['common'],
	resources: {},
	lng: 'ru',
});

export { i18n };
