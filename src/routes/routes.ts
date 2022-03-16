import { ComponentType, lazy } from "react";
import { HomePage } from "@/pages";
import { ROUTES } from "@/const";

interface Route {
	readonly path: string;
	readonly Component: ComponentType;
	readonly isOnlyAuth?: true;
}

const Login = lazy(() => import("@/pages/LoginPage"));
const Registration = lazy(() => import("@/pages/RegistrationPage"));
const Settings = lazy(() => import("@/pages/SettingsPage"));

export const routes: Route[] = [
	{
		path: ROUTES.HOMEPAGE,
		Component: HomePage,
		isOnlyAuth: true,
	},
	{
		path: ROUTES.LOGIN,
		Component: Login,
	},
	{
		path: ROUTES.REGISTRATION,
		Component: Registration,
	},
	{
		path: ROUTES.SETTINGS,
		Component: Settings,
		isOnlyAuth: true,
	},
];
