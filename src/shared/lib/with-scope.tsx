import type { MoleculeScope } from 'bunshi';
import { ScopeProvider } from 'bunshi/react';
import type { ComponentType } from 'react';

type AnyScope = MoleculeScope<unknown>;
type Decorator<Props> = (
	Component: ComponentType<Props>
) => ComponentType<Props>;
type ScopePayload<MoleculeScope extends AnyScope> =
	MoleculeScope['defaultValue'];

interface WithScope {
	<Props>(scope: MoleculeScope<never>): Decorator<Props>;
	<Props, Scope extends AnyScope>(
		scope: Scope,
		mapper: (props: Props) => ScopePayload<Scope>
	): Decorator<Props>;
}

export const withScope = ((
	scope: AnyScope,
	mapper = () => undefined as any
) => {
	return (Component) => {
		return (props) => {
			return (
				<ScopeProvider scope={scope} value={mapper(props)}>
					<Component {...props} />
				</ScopeProvider>
			);
		};
	};
}) as WithScope;
