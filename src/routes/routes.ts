import { ComponentType } from "react";
import { HomePage, LoginPage, RegistrationPage } from "@/pages";

interface Route {
	readonly path: string;
	readonly Component: ComponentType;
	readonly isOnlyAuth?: true;
}

export const routes: Route[] = [
	{
		path: "*",
		Component: HomePage,
		isOnlyAuth: true,
	},
	{
		path: "login",
		Component: LoginPage,
	},
	{
		path: "registration",
		Component: RegistrationPage,
	},
];
