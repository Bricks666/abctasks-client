import {
	ComponentElement,
	ComponentType,
	FC,
	PropsWithChildren,
	createElement,
} from 'react';

export const createRootProvider = (
	...providers: ComponentType<PropsWithChildren>[]
): ComponentType<PropsWithChildren> => {
	return (props) => {
		return providers.reduceRight((providers, provider) => {
			return createElement(provider, { children: providers });
		}, props.children);
	};
};
