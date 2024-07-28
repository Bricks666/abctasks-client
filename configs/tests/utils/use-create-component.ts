import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { ComponentType, createElement } from 'react';

export interface UseCreateComponentParams<Props> {
	readonly Component: ComponentType<Props>;
	readonly defaultProps?: Props;
	readonly options?: RenderOptions;
}

export type GetWrapper = () => RenderResult;

export interface UseCreateComponentResult<Props> {
	readonly getWrapper: GetWrapper;
	readonly create: (props?: Props) => RenderResult;
}

export const useCreateComponent = <Props>(
	params: UseCreateComponentParams<Props>
): UseCreateComponentResult<Props> => {
	const { Component, options, defaultProps } = params;

	let wrapper: RenderResult;

	const result = {} as UseCreateComponentResult<Props>;

	const create = (props?: Props) => {
		wrapper = render(
			createElement(Component, { ...defaultProps, ...props }),
			options
		);

		return wrapper;
	};

	const getWrapper = () => wrapper;

	return { getWrapper, create };
};
