import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { ComponentType, createElement } from 'react';

export interface UseCreateComponentParams<Props> {
	readonly Component: ComponentType<Props>;
	readonly defaultProps?: Props;
	readonly options?: RenderOptions;
}
export interface UseCreateComponentResult<Props> {
	readonly wrapper: RenderResult;
	readonly createComponent: (props?: Props) => RenderResult;
}

export const useCreateComponent = <Props>(
	params: UseCreateComponentParams<Props>
): UseCreateComponentResult<Props> => {
	const { Component, options, defaultProps } = params;

	const result = {} as UseCreateComponentResult<Props>;

	const createComponent = (props?: Props) => {
		result.wrapper = render(
			createElement(Component, { ...defaultProps, ...props }),
			options
		);

		return result.wrapper;
	};

	result.createComponent = createComponent;

	return result;
};
