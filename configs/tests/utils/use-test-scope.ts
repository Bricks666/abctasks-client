import { Scope, fork } from 'effector';
import { ComponentElement, PropsWithChildren } from 'react';
import { createElement } from 'react';
import { beforeEach } from 'vitest';
import { Provider as EffectorProvider } from 'effector-react';

export interface UseTestScopeResult {
	readonly scope: Scope;
	readonly Provider: (props: PropsWithChildren) => ComponentElement<any, any>;
}

export const useTestScope = (
	config?: Parameters<typeof fork>[0]
): UseTestScopeResult => {
	const result = {} as UseTestScopeResult;

	const Provider = (props: PropsWithChildren) => {
		return createElement(EffectorProvider, {
			value: result.scope,
			children: props.children,
		});
	};

	beforeEach(() => {
		result.scope = fork(config);
	});

	result.Provider = Provider;

	return result;
};
