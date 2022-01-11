import { ComponentType } from "react";
import { HomePage } from "../pages";

interface Route {
	path: string;
	Component: ComponentType;
	isOnlyAuth?: true;
}

export const routes: Route[] = [
	{
		path: "/",
		Component: HomePage,
		isOnlyAuth: true,
	},
];
