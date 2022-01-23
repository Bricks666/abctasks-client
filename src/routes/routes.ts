import { ComponentType } from "react";
import { HomePage } from "../pages";
import { LoginPage } from "../pages/LoginPage";

interface Route {
	readonly path: string;
	readonly Component: ComponentType;
	readonly isOnlyAuth?: true;
}

export const routes: Route[] = [
	{
		path: "/",
		Component: HomePage,
		isOnlyAuth: true,
	},
	{
		path: "/login",
		Component: LoginPage,
	},
];
