import { allSettled } from 'effector';
import { RouterProvider } from 'atomic-router-react';
import { MemoryHistoryOptions, createMemoryHistory } from 'history';
import { ComponentType, PropsWithChildren, createElement } from 'react';
import { createHistoryRouter } from 'atomic-router';
import { GetScope } from './use-test-scope';
import { beforeEach } from 'vitest';

type HistoryRouter = ReturnType<typeof createHistoryRouter>;

export interface UseTestRouterParams {
	readonly router: HistoryRouter;
	readonly getScope: GetScope;
	readonly options?: MemoryHistoryOptions;
}

export interface UseTestRouterResult {
	readonly Provider: ComponentType<PropsWithChildren>;
}

export const useTestRouter = (params: UseTestRouterParams) => {
	const { getScope, router, options } = params;

	beforeEach(() => {
		allSettled(router.setHistory, {
			scope: getScope(),
			params: createMemoryHistory(options),
		});
	});

	const Provider = (props: PropsWithChildren) => {
		return createElement(RouterProvider, { router, children: props.children });
	};

	return {
		Provider,
	};
};
