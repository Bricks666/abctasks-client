import type { ComponentProps, ComponentType, PropsWithChildren } from 'react';

type Decorator<C extends ComponentType<any>> = (Component: C) => C;

interface WithProvider {
	<Component extends ComponentType<any>>(
		Provider: ComponentType<PropsWithChildren>
	): Decorator<ComponentProps<Component>>;
	<
		Component extends ComponentType<any>,
		Provider extends ComponentType<PropsWithChildren>,
	>(
		Provider: Provider,
		mapper: (props: ComponentProps<Component>) => ComponentProps<Provider>
	): Decorator<Component>;
}

export const withProvider = ((
	Provider: ComponentType<PropsWithChildren>,
	mapper = () => ({}) as any
) => {
	return (Component) => {
		return (props) => {
			return (
				<Provider {...mapper(props)}>
					<Component {...props} />
				</Provider>
			);
		};
	};
}) as WithProvider;
