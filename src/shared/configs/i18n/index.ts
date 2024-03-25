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

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'common';
		resources: {
			activate: typeof import('./locales/en/activate.json');
			activities: typeof import('./locales/en/activities.json');
			common: typeof import('./locales/en/common.json');
			login: typeof import('./locales/en/login.json');
			registration: typeof import('./locales/en/registration.json');
			['room-activities']: typeof import('./locales/en/room-activities.json');
			['room-invitation']: typeof import('./locales/en/room-invitation.json');
			['room-invitations']: typeof import('./locales/en/room-invitations.json');
			['room-tags']: typeof import('./locales/en/room-tags.json');
			['room-tasks']: typeof import('./locales/en/room-tasks.json');
			['room-users']: typeof import('./locales/en/room-users.json');
			room: typeof import('./locales/en/room.json');
			rooms: typeof import('./locales/en/rooms.json');
			tasks: typeof import('./locales/en/tasks.json');
			thanks: typeof import('./locales/en/thanks.json');
		};
	}
}

export { i18n };
