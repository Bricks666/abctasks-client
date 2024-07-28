import { Scope, fork } from 'effector';
import { ComponentType, PropsWithChildren } from 'react';
import { createElement } from 'react';
import { beforeEach } from 'vitest';
import { Provider as EffectorProvider } from 'effector-react';

export type GetScope = () => Scope;

export interface UseTestScopeResult {
	readonly getScope: GetScope;
	readonly Provider: ComponentType<PropsWithChildren>;
}

export const useTestScope = (
	config?: Parameters<typeof fork>[0]
): UseTestScopeResult => {
	let scope: Scope;

	const getScope = () => scope;

	const Provider = (props: PropsWithChildren) => {
		return createElement(EffectorProvider, {
			value: scope,
			children: props.children,
		});
	};

	beforeEach(() => {
		scope = fork(config);
	});

	return {
		getScope,
		Provider,
	};
};
