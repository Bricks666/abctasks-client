import { Scope, allSettled } from 'effector';
import { RouterProvider } from 'atomic-router-react';
import { MemoryHistoryOptions, createMemoryHistory } from 'history';
import { ComponentType, PropsWithChildren, createElement } from 'react';
import { router } from '@/shared/configs';

export interface UseTestRouterResult {
	readonly initRouter: (scope: Scope) => Promise<void>;
	readonly Provider: ComponentType<PropsWithChildren>;
}

export const useTestRouter = (options?: MemoryHistoryOptions) => {
	const initRouter = async (scope: Scope) => {
		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory(options),
		});
	};

	const Provider = (props: PropsWithChildren) => {
		return createElement(RouterProvider, { router, children: props.children });
	};

	return {
		initRouter,
		Provider,
	};
};
